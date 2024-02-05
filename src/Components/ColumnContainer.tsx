import { IonItem, IonReorder, IonReorderGroup, ItemReorderEventDetail } from '@ionic/react'

import { Column, Id, Drill } from './../types/types'
import styles from './ColumnContainer.module.scss'
import { DrillCard } from './DrillCard'
import InputModal from './modal/InputModal'
import { FloatingActionButton } from './utilParts/FloatingActionButton'

type Props = {
  column: Column
  drills: Drill[]
  createDrill: (columnId: Id, content: string) => void
  deleteDrill: (id: Id) => void
  updateDrill: (id: Id, content: string) => void
  updateDrillStatus: (id: Id, status: boolean) => void
  submitButtonEnabled: boolean
  updateDrillColumnId: (id: Id, columnId: string) => void
  submitDrill: (todayMemo: string) => void
}

export const ColumnContainer = (props: Props) => {
  const {
    column,
    drills,
    createDrill,
    deleteDrill,
    updateDrill,
    updateDrillStatus,
    submitButtonEnabled,
    updateDrillColumnId,
    submitDrill
  } = props

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    event.detail.complete()
  }

  return (
    <>
      <div className={styles['column-container']} id={column.id}>
        {/* column title */}
        <div className={styles['column-title']}>
          <div>{column.title}</div>
        </div>
        {/* column drill container */}
        <div className={styles['column-drill-container']}>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            {drills.map((drill) => (
              <IonItem key={drill.id} className={styles['column-drill-item']} lines="none">
                <DrillCard
                  drill={drill}
                  columnId={column.id}
                  deleteDrill={deleteDrill}
                  updateDrill={updateDrill}
                  updateDrillStatus={updateDrillStatus}
                  updateDrillColumnId={updateDrillColumnId}
                />
                <IonReorder slot="end" style={{ marginLeft: '0' }}></IonReorder>
              </IonItem>
            ))}
          </IonReorderGroup>
          <FloatingActionButton />
        </div>
        {/* column fotter */}
        {column.id === 'stock' && (
          <InputModal
            mode="createDrill"
            modalButtonTitle="ドリルを追加"
            title="新規ドリル作成"
            subTitle=""
            textAreaLabel="ドリルの内容"
            placeHolder="ドリルの内容を入力してください"
            button1Label="作成"
            button2Label="キャンセル"
            createDrill={createDrill}
            submitDrill={submitDrill}
            disabled={false}
          />
        )}
        {column.id === 'drill' && (
          <InputModal
            mode="submitToday"
            modalButtonTitle="送信"
            title="今日のドリルを送信"
            subTitle="本日もお疲れ様でした"
            textAreaLabel="今日のメモ"
            placeHolder="今日のメモを入力してください"
            button1Label="送信"
            button2Label="キャンセル"
            // createDrill={createDrill}
            disabled={!submitButtonEnabled}
            createDrill={createDrill}
            submitDrill={submitDrill}
          />
        )}
      </div>
    </>
  )
}
