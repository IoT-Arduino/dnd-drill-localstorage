import { useState } from 'react'
import { IonButton } from '@ionic/react'
import Button from 'react-bootstrap/Button'
import { CiCirclePlus } from 'react-icons/ci'
import { BsSendArrowUp } from 'react-icons/bs'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import { Id, DrillContent } from '../../types/types'
import styles from './InputModal.module.scss'
import { MAX_TEXT_LENGTH } from '../../consts/const'

type Props = {
  mode: string
  modalButtonTitle: string
  title: string
  subTitle?: string
  urlInputLavel?: string
  textAreaLabel: string
  placeHolder?: string
  button1Label: string
  button2Label: string
  createDrill: (columnId: Id, content: DrillContent) => void
  submitDrill: (todayMemo: string) => void
  disabled: boolean
}

const InputModal = (props: Props) => {
  const {
    mode,
    modalButtonTitle,
    title,
    subTitle,
    urlInputLavel,
    textAreaLabel,
    button1Label,
    button2Label,
    createDrill,
    submitDrill,
    disabled
  } = props

  const [show, setShow] = useState(false)
  const [inputText, setInputText] = useState('')
  const [inputUrl, setInputUrl] = useState('')

  const [validated, setValidated] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const submitModalForm = (e: any) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)

    const inputContent: DrillContent = {
      text: inputText,
      url: inputUrl
    }
    if (mode === 'createDrill') {
      createDrill('stock', inputContent)
      setInputUrl('')
      setInputText('')
      setShow(false)
    } else if (mode === 'submitToday') {
      submitDrill(inputText)
      setInputText('')
      setShow(false)
    } else {
      return
    }
  }

  const cancelSubmit = () => {
    setInputUrl('')
    setInputText('')
    setShow(false)
  }

  return (
    <>
      <IonButton color="success" className={styles['modal-button']} onClick={handleShow} disabled={disabled}>
        <span className={styles['modal-submit-icon']}>
          {mode === 'createDrill' ? <CiCirclePlus /> : <BsSendArrowUp />}
        </span>
        <span className={styles['modal-submit-text']}>{modalButtonTitle}</span>
      </IonButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {subTitle && <p>{subTitle}</p>}

          {/* Form section */}
          <Form noValidate validated={validated}>
            {mode === 'createDrill' && (
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
            )}

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

export default InputModal
