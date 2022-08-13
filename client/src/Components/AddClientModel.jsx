import {useState} from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import {Button, Modal, Form} from 'react-bootstrap';

const AddClientModel = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // form useState
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()

    // submit function
    const onSubmit = (e) =>{
      e.preventDefault();
      console.log(name, email, phone)
    }
  
    return (
      <>
        <Button variant="primary" onClick={handleShow} >
          <div className="d-flex align-items-center">
            <FaUser className='icon'/>
            <div>Add Client</div>
          </div>
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group className='mb-3'>
                <Form.Control type='text' placeholder='Name' value={name} onChange={(e)=> setName(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type='email' placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type='text' placeholder='Phone' value={phone} onChange={(e)=> setPhone(e.target.value)}/>
              </Form.Group>
              <Button type='submit' variant='primary' className="btn" data-bs-dismiss="modal">Submit</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>  
    )
}

export default AddClientModel