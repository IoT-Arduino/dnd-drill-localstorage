import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { Id } from '../../types/types'

type Props = {
  modalButtonTitle: string
  title: string
  subTitle?: string
  textAreaLabel: string
  placeHolder?: string
  button1Label: string
  button2Label: string
  createDrill: (columnId: Id, content:string) => void
}


const InputModal = (props: Props) => {
  const { modalButtonTitle,title, subTitle, textAreaLabel, button1Label, button2Label, createDrill} = props

  const [show, setShow] = useState(false)
  const [inputText,setInputText] = useState('')
  

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const submitModalForm = () => {
    createDrill('stock',inputText)
    setInputText('')
    setShow(false)
  }

  const cancelSubmit = () => {
    setInputText('')
    setShow(false)
  }

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        {modalButtonTitle}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { subTitle && <p>{subTitle}</p>}
          <p></p>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>{textAreaLabel}</Form.Label>
              <Form.Control as="textarea" rows={3} value={inputText} onChange={(e)=> setInputText(e.target.value)}/>
            </Form.Group>
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
