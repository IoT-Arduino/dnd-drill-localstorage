import { useState, useRef } from 'react'
import {
  // IonButton,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel
  // IonTextarea,
  // TextareaChangeEventDetail
} from '@ionic/react'
import { archive, trash, pencilOutline, checkmarkDoneCircleOutline, arrowUndoCircleOutline } from 'ionicons/icons'

// import { Dialog } from './Dialog/Dialog'
import { Drill, Id } from './../types/types'
import styles from './DrillCard.module.scss'

// for edit modal
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import { MAX_TEXT_LENGTH } from '../consts/const'

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
  const [editDrillContent, setEditDrillContent] = useState<string>(drill.content)
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false)

  const moveToColumnId = columnId === 'stock' ? 'drill' : 'stock'
  const slideRef = useRef<HTMLIonItemSlidingElement>(null)

  const closeSlidingItem = () => {
    slideRef.current?.close()
  }

  return (
    <>
      <IonItemSliding ref={slideRef} className={styles['drill-item']}>
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
          <IonItem lines="none">
            <IonLabel className={styles['drill-item-label']}>{drill.content}</IonLabel>
          </IonItem>
        ) : (
          <IonItem lines="none">
            <IonLabel className={drillComplete ? styles['drill-item-done'] : styles['drill-item-label']}>
              {drill.content}
            </IonLabel>
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
      <>
        <Modal show={openEditDialog} onHide={() => setOpenEditDialog(false)}>
          <Modal.Header closeButton>
            <Modal.Title>ドリルの編集</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>ドリルの内容</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editDrillContent}
                  onChange={(e) => setEditDrillContent(e.target.value!)}
                  maxLength={MAX_TEXT_LENGTH}
                />
              </Form.Group>
            </Form>
            <p style={{textAlign:"right", fontSize:"12px"}}>{`${editDrillContent.length}文字/${MAX_TEXT_LENGTH}文字`}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => {
                updateDrill(drill.id, editDrillContent)
                setOpenEditDialog(false)
              }}
            >
              編集確定
            </Button>
            <Button variant="secondary" onClick={() => setOpenEditDialog(false)}>
              キャンセル
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      {/* dialog for edit drill */}
      {/* <Dialog isOpen={openEditDialog} onClose={() => setOpenEditDialog(false)}>
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
        <IonButton
          color="success"
          type="button"
          onClick={() => {
            updateDrill(drill.id, editDrillContent)
            setOpenEditDialog(false)
          }}
        >
          編集確定
        </IonButton>
        <IonButton
          color="success"
          type="button"
          onClick={() => {
            setOpenEditDialog(false)
          }}
        >
          編集キャンセル
        </IonButton>
      </Dialog> */}
    </>
  )
}
