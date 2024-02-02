import { useState, useRef } from 'react'
import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonTextarea,
  TextareaChangeEventDetail
} from '@ionic/react'
import { archive, trash, pencilOutline, checkmarkDoneCircleOutline, arrowUndoCircleOutline } from 'ionicons/icons'

import { Dialog } from './Dialog/Dialog'
import { Drill, Id } from './../types/types'
import styles from './DrillCard.module.scss'

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
  const [drillComplete, setDrillComplete] = useState<boolean>(false)
  const [editDrillContent, setEditDrillContent] = useState<string>('')
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false)

  const moveToColumnId = columnId === 'stock' ? 'drill' : 'stock'
  const slideRef = useRef<HTMLIonItemSlidingElement>(null)

  const closeSlidingItem = () => {
    slideRef.current?.close()
  }

  return (
    <>
      <IonItemSliding ref={slideRef}>
        {columnId === 'stock' ? (
          <IonItemOptions side="start">
            <IonItemOption
              onClick={() => {
                setOpenEditDialog(true)
                closeSlidingItem()
              }}
            >
              <IonIcon slot="start" icon={pencilOutline}></IonIcon>
              Edit
            </IonItemOption>
            <IonItemOption
              color="danger"
              onClick={() => {
                deleteDrill(drill.id)
                closeSlidingItem()
              }}
            >
              <IonIcon slot="start" icon={trash}></IonIcon>
              Delete
            </IonItemOption>
          </IonItemOptions>
        ) : null}

        {columnId === 'drill' && drillComplete ? (
          <IonItemOptions side="start">
            <IonItemOption
              color="success"
              onClick={() => {
                updateDrillStatus(drill.id, false)
                setDrillComplete(false)
                closeSlidingItem()
              }}
            >
              <IonIcon slot="start" icon={arrowUndoCircleOutline}></IonIcon>
              UnCheck
            </IonItemOption>
          </IonItemOptions>
        ) : columnId === 'drill' && !drillComplete ? (
          <IonItemOptions side="start">
            <IonItemOption
              onClick={() => {
                updateDrillStatus(drill.id, true)
                setDrillComplete(true)
                closeSlidingItem()
              }}
            >
              <IonIcon slot="start" icon={checkmarkDoneCircleOutline}></IonIcon>
              Done
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
              <IonLabel>{drill.content}</IonLabel>
            )}
          </IonItem>
        )}

        <IonItemOptions side="end">
          <IonItemOption
            color="success"
            onClick={() => {
              updateDrillColumnId(drill.id, moveToColumnId)
              closeSlidingItem()
            }}
          >
            <IonIcon slot="start" icon={archive}></IonIcon>
            移動
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>

      {/* dialog for edit drill */}
      <Dialog isOpen={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <header>
          <h2>ドリルの編集</h2>
        </header>
        <div className={styles['dialog-textarea']}>
          <IonTextarea
            label="ドリルの内容"
            placeholder="ドリルの内容入力してください"
            labelPlacement="floating"
            fill="outline"
            value={drill.content}
            onIonChange={(e: CustomEvent<TextareaChangeEventDetail>) => setEditDrillContent(e.detail.value!)}
          ></IonTextarea>
        </div>
        <button
          type="button"
          onClick={() => {
            updateDrill(drill.id, editDrillContent)
            setOpenEditDialog(false)
          }}
        >
          編集確定
        </button>
        <button
          type="button"
          onClick={() => {
            setOpenEditDialog(false)
          }}
        >
          編集キャンセル
        </button>
      </Dialog>
    </>
  )
}
