import { useState } from 'react'
import { IonHeader, IonLabel, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react'

import { ColumnContainer } from './ColumnContainer'
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

export const MainBoard = () => {
  const [columns] = useState<Column[]>(PresetColumns)

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

    setSubmitButtonEnabled(false)
    moveDrillsOnSubmit()
  }

  return (
    <>
      <IonHeader>
        <IonToolbar color="success" id="titleBar">
          <IonSegment value="all">
            <IonSegmentButton value="all">
              <IonLabel>Mainboard</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="favorites">
              <IonLabel>History</IonLabel>
            </IonSegmentButton>
          </IonSegment>
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
              updateDrillColumnId={updateDrillColumnId}
              submitDrill={submitDrill}
            />
          )
        })}
      </div>
    </>
  )
}
