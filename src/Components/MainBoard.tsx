import { useState } from 'react'
import { IonHeader, IonTitle, IonToolbar } from '@ionic/react'

import { ColumnContainer } from './ColumnContainer'
// import { Dialog } from './Dialog/Dialog'
import styles from './MainBoard.module.scss'
import { Column, Id } from './../types/types'
import { useStorage } from '../hooks/useStorage'

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

// interface TextareaChangeEventDetail {
//   value?: string | null
// }

export const MainBoard = () => {
  const [columns] = useState<Column[]>(PresetColumns)
  // const [drillContent, setDrillContent] = useState<string>('')
  // const [todayMemo, setTodayMemo] = useState<string>('')
  // const [openDialog, setOpenDialog] = useState<boolean>(false)
  // const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false)

  // storage related
  const {
    drills,
    createDrillOnStorage,
    deleteDrillOnStorage,
    updateDrillOnStorage,
    updateDrillColumnIdOnStorage,
    updateDrillStatusOnStorage,
    moveDrillsOnSubmit,
    submitButtonEnabled,
    setSubmitButtonEnabled
  } = useStorage()

  const dateInfo = new Date()
  const today = `${dateInfo.getFullYear()}年${dateInfo.getMonth() + 1}月${dateInfo.getDate()}日`
  const drillItemsCheckedFiltered = drills.filter((drill) => drill.columnId === 'drill' && drill.status === true)
  const drillItemsChecked = drillItemsCheckedFiltered.map((item) => ({ id: item.id, content: item.content }))

  const createDrill = async (columnId: Id, content: string) => {
    await createDrillOnStorage(columnId, content)
  }

  const deleteDrill = async (id: Id) => {
    await deleteDrillOnStorage(id)
  }

  const updateDrill = async (id: Id, content: string) => {
    await updateDrillOnStorage(id, content)
  }

  const updateDrillColumnId = async (id: Id, columnId: string) => {
    await updateDrillColumnIdOnStorage(id, columnId)
  }

  const updateDrillStatus = async (id: Id, status: boolean) => {
    await updateDrillStatusOnStorage(id, status)
  }

  const submitDrill = (todayMemo: string) => {
    // チェック済みのドリル項目を送信する
    const submitObject = {
      date: today,
      memo: todayMemo,
      drillItemsChecked
    }

    // 保存機能と差し替え予定
    console.log(submitObject)

    // setTodayMemo('')
    setSubmitButtonEnabled(false)
    moveDrillsOnSubmit()
  }

  return (
    <>
      <IonHeader>
        <IonToolbar color="success" id="titleBar">
          <IonTitle>My Drills</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div className={styles['main-wrapper']}>
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
              // setOpenDialog={setOpenDialog}
              // setOpenCreateDialog={setOpenCreateDialog}
              updateDrillColumnId={updateDrillColumnId}
              submitDrill={submitDrill}
            />
          )
        })}
      </div>

      {/* submit dialog */}
      {/* <Dialog isOpen={openDialog} onClose={() => setOpenDialog(false)}>
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
          <IonButton
            color="success"
            type="button"
            onClick={() => {
              setOpenDialog(false)
              submitDrill()
            }}
          >
            送信
          </IonButton>
          <IonButton
            color="success"
            type="button"
            onClick={() => {
              setOpenDialog(false)
            }}
          >
            キャンセル
          </IonButton>
        </footer>
      </Dialog> */}

      {/* create dialog */}
      {/* <Dialog isOpen={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
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
          <IonButton
            color="success"
            type="button"
            onClick={() => {
              setOpenCreateDialog(false)
              createDrill('stock', "content")
            }}
          >
            作成
          </IonButton>
          <IonButton
            color="success"
            type="button"
            onClick={() => {
              setOpenCreateDialog(false)
            }}
          >
            キャンセル
          </IonButton>
        </footer>
      </Dialog> */}
    </>
  )
}
