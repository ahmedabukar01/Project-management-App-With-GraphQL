import {useState} from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddClientModel = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
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
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>  
    )
}

export default AddClientModel