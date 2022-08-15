import {useState} from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import {ADD_CLIENT} from '../mutations/clientMutations'
import {GET_CLIENTS} from '../queries/clientQueries'

import {Button, Modal, Form} from 'react-bootstrap';


const AddClientModel = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // form useState
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [clientId, setClientId] = useState()
    const [status, setStatus] = useState('new')

    // get clients for select
    const {loading, error, data} = useQuery(GET_CLIENTS);

    // submit function
    const onSubmit = (e) =>{
      e.preventDefault();
      if(name === '' || description === '' || status === '' || clientId === ''){
        return alert('Please fill in all fields')
      }

      setName('');
      setDescription('');
      setStatus('new');
      setClientId('')
    }
  
    if(loading) return null;
    if(error) return 'something is wrong'
    return (
      <>
      {!loading && !error && (
        <>
         <Button variant="secondary" onClick={handleShow} >
          <div className="d-flex align-items-center">
            <FaList className='icon'/>
            <div>Add Project</div>
          </div>
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group className='mb-3'>
                <Form.Control type='text' placeholder='Name' value={name} onChange={(e)=> setName(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type='text' placeholder='Description' value={description} onChange={(e)=> setDescription(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Select onChange={(e)=> setStatus(e.target.value)}>
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                </Form.Select>
                <Form.Group>
                    <Form.Select value={clientId} onChange={(e)=> setClientId(e.target.value)}>
                        <option value=''>Select client</option>
                        {data.clients.map(client=>(
                            <option value={client.id}>{client.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
              </Form.Group>
              <Button type='submit' variant='primary' className="btn" onClick={handleClose}>Submit</Button>
            </Form>
          </Modal.Body>
        </Modal>
        </>
      )}
       
      </>  
    )
}

export default AddClientModel