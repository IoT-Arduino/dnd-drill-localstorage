import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { Id } from '../../types/types'

import { IonButton } from '@ionic/react'

import { CiCirclePlus } from 'react-icons/ci'
import { BsSendArrowUp } from 'react-icons/bs'
import styles from './InputModal.module.scss'

import { MAX_TEXT_LENGTH } from '../../consts/const'

type Props = {
  mode: string
  modalButtonTitle: string
  title: string
  subTitle?: string
  textAreaLabel: string
  placeHolder?: string
  button1Label: string
  button2Label: string
  createDrill: (columnId: Id, content: string) => void
  submitDrill: (todayMemo: string) => void
  disabled: boolean
}

const InputModal = (props: Props) => {
  const {
    mode,
    modalButtonTitle,
    title,
    subTitle,
    textAreaLabel,
    button1Label,
    button2Label,
    createDrill,
    submitDrill,
    disabled
  } = props

  const [show, setShow] = useState(false)
  const [inputText, setInputText] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const submitModalForm = () => {
    if (mode === 'createDrill') {
      createDrill('stock', inputText)
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
    setInputText('')
    setShow(false)
  }

  return (
    <>
      {/* <Button variant="success" onClick={handleShow} disabled={disabled}>
        {modalButtonTitle}
      </Button> */}
      <IonButton color="success" className={styles['modal-button']} onClick={handleShow} disabled={disabled}>
        {mode === 'createDrill' ? <CiCirclePlus /> : <BsSendArrowUp />}
        <span className={styles['modal-submit-text']}>{modalButtonTitle}</span>
      </IonButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {subTitle && <p>{subTitle}</p>}
          <p></p>
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

export default InputModal
