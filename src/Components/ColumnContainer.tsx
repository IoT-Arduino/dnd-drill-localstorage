import { IonButton, IonItem, IonReorder, IonReorderGroup, ItemReorderEventDetail } from '@ionic/react'
import { CiCirclePlus } from 'react-icons/ci'
import { BsSendArrowUp } from 'react-icons/bs'

import { DrillCard } from './DrillCard'
import { Column, Id, Drill } from './../types/types'
import styles from './ColumnContainer.module.scss'

type Props = {
  column: Column
  drills: Drill[]
  createDrill: (columnId: Id) => void
  deleteDrill: (id: Id) => void
  updateDrill: (id: Id, content: string) => void
  updateDrillStatus: (id: Id, status: boolean) => void
  submitButtonEnabled: boolean
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
  setOpenCreateDialog: React.Dispatch<React.SetStateAction<boolean>>
  updateDrillColumnId: (id: Id, columnId: string) => void
}

export const ColumnContainer = (props: Props) => {
  const {
    column,
    drills,
    // createDrill,
    deleteDrill,
    updateDrill,
    updateDrillStatus,
    submitButtonEnabled,
    setOpenDialog,
    setOpenCreateDialog,
    updateDrillColumnId
  } = props

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    event.detail.complete()
  }

  return (
    <>
      <div className={styles['column-container']}>
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
        </div>
        {/* column fotter */}
        {column.id === 'stock' && (
          <IonButton
            color="success"
            className={styles['column-footer']}
            onClick={() => {
              setOpenCreateDialog(true)
            }}
          >
            <CiCirclePlus />
            ドリルを追加
          </IonButton>
        )}
        {column.id === 'drill' && (
          <IonButton
            color="success"
            className={styles['column-footer']}
            onClick={() => {
              setOpenDialog(true)
            }}
            disabled={!submitButtonEnabled}
          >
            <BsSendArrowUp />
            <span className={styles['column-submit-text']}>送信</span>
          </IonButton>
        )}
      </div>
    </>
  )
}
