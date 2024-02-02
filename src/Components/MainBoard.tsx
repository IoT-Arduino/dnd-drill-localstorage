import { useState } from 'react'
import { IonTextarea } from '@ionic/react'
import { v4 as uuidv4 } from 'uuid'

import { ColumnContainer } from './ColumnContainer'
import { Dialog } from './Dialog/Dialog'
import styles from './MainBoard.module.scss'
import { Column, Id, Drill } from './../types/types'

const PresetColumns: Column[] = [
  {
    id: 'drill',
    title: '明日のドリル'
  },
  {
    id: 'stock',
    title: 'ドリルストック'
  }
]

interface TextareaChangeEventDetail {
  value?: string | null
}

export const MainBoard = () => {
  const [columns] = useState<Column[]>(PresetColumns)
  const [drills, setDrills] = useState<Drill[]>([])
  const [drillContent, setDrillContent] = useState<string>('')

  const [todayMemo, setTodayMemo] = useState<string>('')
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false)

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false)

  const dateInfo = new Date()
  const today = `${dateInfo.getFullYear()}年${dateInfo.getMonth() + 1}月${dateInfo.getDate()}日`
  const drillItemsCheckedFiltered = drills.filter((drill) => drill.columnId === 'drill' && drill.status === true)
  const drillItemsChecked = drillItemsCheckedFiltered.map((item) => ({ id: item.id, content: item.content }))

  const createDrill = (columnId: Id) => {
    const uniqueId = uuidv4()
    const newDrill: Drill = {
      id: uniqueId,
      columnId,
      content: `Drill ${drills.length + 1} ${drillContent}`, // 仮置き
      status: false
    }
    setDrills([...drills, newDrill])
  }

  const deleteDrill = (id: Id) => {
    const newDrills = drills.filter((drill) => drill.id !== id)
    setDrills(newDrills)
  }

  const updateDrill = (id: Id, content: string) => {
    const newDrills = drills.map((drill) => {
      if (drill.id !== id) return drill
      return { ...drill, content }
    })
    setDrills(newDrills)
  }

  const updateDrillColumnId = (id: Id, columnId: string) => {
    const newDrills = drills.map((drill) => {
      if (drill.id !== id) return drill
      return { ...drill, columnId }
    })
    setDrills(newDrills)
  }

  const updateDrillStatus = (id: Id, status: boolean) => {
    const newDrills = drills.map((drill) => {
      if (drill.id !== id) return drill
      return { ...drill, status }
    })
    const isAnyDrillActive = newDrills.some((drill) => drill.status)
    console.log(newDrills)
    setSubmitButtonEnabled(isAnyDrillActive)
    setDrills(newDrills)
  }

  const submitDrill = () => {
    // チェック済みのドリル項目を送信する
    const submitObject = {
      date: today,
      memo: todayMemo,
      drillItemsChecked
    }

    // 保存機能と差し替え予定
    console.log(submitObject)

    setTodayMemo('')
    setSubmitButtonEnabled(false)

    // drillコラムの中のdrillアイテムをstockコラムに移動。
    const newDrills = drills.map((drill) => {
      if (drill.columnId === 'drill') {
        drill.columnId = 'stock'
        drill.status = false
      }
      return drill
    })
    setDrills(newDrills)
  }

  return (
    <>
      <div className={styles['main-wrapper']}>
        <div className={styles['context-wrapper']}>
          <div className={styles['context-wrapper-sortable']}>
            {columns.map((col) => {
              return (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  drills={drills.filter((drill) => drill.columnId === col.id)}
                  createDrill={createDrill}
                  deleteDrill={deleteDrill}
                  updateDrill={updateDrill}
                  updateDrillStatus={updateDrillStatus}
                  submitButtonEnabled={submitButtonEnabled}
                  setOpenDialog={setOpenDialog}
                  setOpenCreateDialog={setOpenCreateDialog}
                  updateDrillColumnId={updateDrillColumnId}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* submit dialog */}
      <Dialog isOpen={openDialog} onClose={() => setOpenDialog(false)}>
        <header>
          <h2>今日のドリルを送信</h2>
        </header>
        <div>
          <p>本日も練習お疲れ様でした</p>
          <p>{today}</p>
          <ul>
            {drillItemsChecked.map((item) => (
              <li key={item.id}>{item.content}</li>
            ))}
          </ul>
          <div className={styles['dialog-textarea']}>
            <IonTextarea
              label="今日のメモ"
              placeholder="今日のメモを入力してください"
              labelPlacement="floating"
              fill="outline"
              value={todayMemo}
              onIonChange={(e: CustomEvent<TextareaChangeEventDetail>) => setTodayMemo(e.detail.value!)}
            ></IonTextarea>
          </div>
        </div>
        <footer className="">
          <button
            type="button"
            onClick={() => {
              setOpenDialog(false)
              submitDrill()
            }}
          >
            送信
          </button>
          <button
            type="button"
            onClick={() => {
              setOpenDialog(false)
            }}
          >
            キャンセル
          </button>
        </footer>
      </Dialog>

      {/* create dialog */}
      <Dialog isOpen={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <header>
          <h2>新規ドリルを作成</h2>
        </header>
        <div>
          <div className={styles['dialog-textarea']}>
            <IonTextarea
              label="ドリルの内容"
              placeholder="ドリルの内容を入力してください"
              labelPlacement="floating"
              fill="outline"
              value={todayMemo}
              onIonChange={(e: CustomEvent<TextareaChangeEventDetail>) => setDrillContent(e.detail.value!)}
            ></IonTextarea>
          </div>
        </div>
        <footer className="">
          <button
            type="button"
            onClick={() => {
              setOpenCreateDialog(false)
              createDrill('stock')
            }}
          >
            作成
          </button>
          <button
            type="button"
            onClick={() => {
              setOpenCreateDialog(false)
            }}
          >
            キャンセル
          </button>
        </footer>
      </Dialog>
    </>
  )
}
