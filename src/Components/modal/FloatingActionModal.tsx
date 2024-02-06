import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { IonIcon } from '@ionic/react'
import { addCircleOutline } from 'ionicons/icons'

import { Id } from '../../types/types'
import { MAX_TEXT_LENGTH } from '../../consts/const'

type Props = {
  mode: string
  title: string
  textAreaLabel: string
  placeHolder?: string
  button1Label: string
  button2Label: string
  createDrill: (columnId: Id, content: string) => void
  scrollToBottom: () => void
}

export const FloatingActionModal = (props: Props) => {
  const { title, textAreaLabel, button1Label, button2Label, createDrill, scrollToBottom } = props

  const [show, setShow] = useState(false)
  const [inputText, setInputText] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const submitModalForm = () => {
    createDrill('stock', inputText)
    setInputText('')
    setShow(false)
    scrollToBottom()
  }

  const cancelSubmit = () => {
    setInputText('')
    setShow(false)
  }

  return (
    <>
      <IonIcon icon={addCircleOutline} onClick={handleShow}></IonIcon>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>{textAreaLabel}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                maxLength={MAX_TEXT_LENGTH}
              />
            </Form.Group>
            <p style={{ textAlign: 'right', fontSize: '12px' }}>{`${inputText.length}文字/${MAX_TEXT_LENGTH}文字`}</p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={submitModalForm}>
            {button1Label}
          </Button>
          <Button variant="secondary" onClick={cancelSubmit}>
            {button2Label}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
