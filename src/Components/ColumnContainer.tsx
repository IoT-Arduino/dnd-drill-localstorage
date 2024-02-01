import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CiCirclePlus } from 'react-icons/ci'
import { BsSendArrowUp } from 'react-icons/bs'

import { Column, Id, Drill } from './../types/types'
import styles from './ColumnContainer.module.scss'
import { DrillCard } from './DrillCard'
import { IonItem, IonReorder, IonReorderGroup, ItemReorderEventDetail } from '@ionic/react'

type Props = {
  column: Column
  drills: Drill[]
  createDrill: (columnId: Id) => void
  deleteDrill: (id: Id) => void
  updateDrill: (id: Id, content: string) => void
  updateDrillStatus: (id: Id, status: boolean) => void
  submitButtonEnabled: boolean
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
  updateDrillColumnId: (id: Id, columnId: string) => void
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
    setOpenDialog,
    updateDrillColumnId
  } = props

  // const drillsIds = useMemo(() => {
  //   return drills.map((drill) => drill.id)
  // }, [drills])

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    },
    disabled: true
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className={styles['dragging-container']}></div>
  }

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to)

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete()
  }

  return (
    <>
      <div ref={setNodeRef} style={style} className={styles['column-container']}>
        {/* column title */}
        <div {...attributes} {...listeners} className={styles['column-title']}>
          <div>{column.title}</div>
        </div>
        {/* column drill container */}
        {/* <div className={styles['column-drill-container']}>
          <SortableContext items={drillsIds}>
            {drills.map((drill) => (
              <DrillCard
                key={drill.id}
                drill={drill}
                columnId={column.id}
                deleteDrill={deleteDrill}
                updateDrill={updateDrill}
                updateDrillStatus={updateDrillStatus}
              />
            ))}
          </SortableContext>
        </div> */}
        <div className={styles['column-drill-container']}>
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            {drills.map((drill) => (
              <IonItem key={drill.id}>
                {/* <IonLabel>Item 2</IonLabel> */}
                <DrillCard
                  drill={drill}
                  columnId={column.id}
                  deleteDrill={deleteDrill}
                  updateDrill={updateDrill}
                  updateDrillStatus={updateDrillStatus}
                  updateDrillColumnId={updateDrillColumnId}
                />
                <IonReorder slot="end"></IonReorder>
              </IonItem>
            ))}
          </IonReorderGroup>
        </div>

        {/* Column footer */}
        {column.id === 'stock' && (
          <button
            className={styles['column-footer']}
            onClick={() => {
              createDrill(column.id)
            }}
          >
            <CiCirclePlus />
            ドリルを追加
          </button>
        )}
        {column.id === 'drill' && (
          <button
            className={styles['column-footer']}
            onClick={() => {
              setOpenDialog(true)
            }}
            disabled={!submitButtonEnabled}
          >
            <BsSendArrowUp />
            <span className={styles['column-submit-text']}>送信</span>
          </button>
        )}
      </div>
    </>
  )
}
