import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { IonIcon } from '@ionic/react'
import { addCircleOutline } from 'ionicons/icons'

import { Id, DrillContent } from '../../types/types'
import { MAX_TEXT_LENGTH } from '../../consts/const'

type Props = {
  mode: string
  title: string
  urlInputLavel: string
  textAreaLabel: string
  placeHolder?: string
  button1Label: string
  button2Label: string
  createDrill: (columnId: Id, content: DrillContent) => void
  scrollToBottom: () => void
}

export const FloatingActionModal = (props: Props) => {
  const { title, urlInputLavel, textAreaLabel, button1Label, button2Label, createDrill, scrollToBottom } = props

  const [show, setShow] = useState(false)
  const [inputText, setInputText] = useState('')
  const [inputUrl, setInputUrl] = useState('')

  const [validated, setValidated] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const submitModalForm = (e: any) => {
    const form = e.currentTarget
    if (form.checkValidity()) {
      setValidated(true)
    }
    const inputContent = {
      text: inputText,
      url: inputUrl
    }
    createDrill('stock', inputContent)
    setInputUrl('')
    setInputText('')
    setShow(false)
    scrollToBottom()
  }

  const cancelSubmit = () => {
    setInputUrl('')
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
          <Form noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{urlInputLavel}</Form.Label>
              <Form.Control
                type="url"
                pattern="https?://.*"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                isInvalid={!/^https?:\/\/.*$/.test(inputUrl) && inputUrl.length > 0}
              />
              <Form.Control.Feedback type="invalid">正しいURLを入力してください。</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>{textAreaLabel}</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                maxLength={MAX_TEXT_LENGTH}
              />
            </Form.Group>
            <p style={{ textAlign: 'right', fontSize: '12px', color: inputText.length >= 60 ? 'red' : 'inherit' }}>
              {`${inputText.length}文字/${MAX_TEXT_LENGTH}文字`}
            </p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={submitModalForm} disabled={!inputText.length}>
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
