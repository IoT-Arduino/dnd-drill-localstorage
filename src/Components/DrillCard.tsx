import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { RiDeleteBin6Fill } from 'react-icons/ri'

import { Drill, Id } from './../types/types'
import styles from './DrillCard.module.scss'

import { IonCheckbox, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from '@ionic/react'
import { archive, heart, trash } from 'ionicons/icons'

type Props = {
  drill: Drill
  deleteDrill: (id: Id) => void
  updateDrill: (id: Id, content: string) => void
  updateDrillStatus: (id: Id, status: boolean) => void
  columnId?: 'drill' | 'stock'
  updateDrillColumnId: (id: Id, columnId: string) => void
}

export const DrillCard = ({
  drill,
  deleteDrill,
  updateDrill,
  updateDrillStatus,
  columnId,
  updateDrillColumnId
}: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [drillComplete, setDrillComplete] = useState(false)

  const [inputChecked, setInputChecked] = useState<boolean>(false)

  const moveToColumnId = columnId === 'stock' ? 'drill' : 'stock'

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: drill.id,
    data: {
      type: 'DrillItem',
      drill
    },
    disabled: true
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
    setMouseIsOver(false)
  }

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className={styles['drill-is-dragging']} />
  }

  // const toggleDrillComplete = (drillComplete:boolean) => {
  //   // setDrillComplete((prev) => !prev)
  //   updateDrillStatus(drill.id, drillComplete)
  //   console.log(drillComplete)
  // }

  // if (editMode && columnId === 'stock') {
  //   return (
  //     <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={styles['drill-item-edit']}>
  //       <textarea
  //         className={styles['drill-text-area']}
  //         value={drill.content}
  //         autoFocus
  //         onBlur={toggleEditMode}
  //         onKeyDown={(e) => {
  //           if (e.key === 'Enter' && e.shiftKey) toggleEditMode()
  //         }}
  //         onChange={(e) => updateDrill(drill.id, e.target.value)}
  //       ></textarea>
  //     </div>
  //   )
  // }

  return (
    <>
      <IonItemSliding>
        {columnId === 'stock' ? (
          <IonItemOptions side="start">
            <IonItemOption onClick={() => updateDrill(drill.id, 'dummyContent')}>
              <IonIcon slot="start" icon={trash}></IonIcon>
              Edit
            </IonItemOption>
            <IonItemOption color="danger" onClick={() => deleteDrill(drill.id)}>
              <IonIcon slot="start" icon={trash}></IonIcon>
              Delete
            </IonItemOption>
          </IonItemOptions>
        ) : null}

        {columnId === 'stock' ? (
          <IonItem>
            <IonLabel>{drill.content}</IonLabel>
          </IonItem>
        ) : (
          <IonItem>
            {drillComplete ? (
              <IonLabel>
                <span style={{ textDecoration: 'line-through' }}>{drill.content}</span>
              </IonLabel>
            ) : (
              <IonLabel>
                <IonCheckbox
                  slot="start"
                  labelPlacement="end"
                  justify="start"
                  checked={inputChecked}
                  onIonChange={(e) => {
                    updateDrillStatus(drill.id, e.detail.checked)
                    setInputChecked(e.detail.checked)
                  }}
                >
                  {drill.content}
                </IonCheckbox>
              </IonLabel>
            )}
          </IonItem>
        )}

        <IonItemOptions side="end">
          <IonItemOption color="success" onClick={() => updateDrillColumnId(drill.id, moveToColumnId)}>
            <IonIcon slot="start" icon={archive}></IonIcon>
            移動
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    </>
  )
}
