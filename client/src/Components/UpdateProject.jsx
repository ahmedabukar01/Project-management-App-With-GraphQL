import { useMutation } from '@apollo/client'
import {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import {UPDATE_PROJECT} from '../mutations/projectMutation'
import { GET_PROJECTS } from '../queries/projects'

const UpdateProject = ({project}) => {
    const id = project.id;

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')

    const [updateProject] = useMutation(UPDATE_PROJECT,{
        variables: {id, name, description, status},
        refetchQueries: [{query: GET_PROJECTS, variables: {id: id}}] // without the variables it worked & without calling the function !!
    })

    const onSubmit = (e) => {
        e.preventDefault();

        if(name === '' || description === '' || status === ''){
            return alert('please fill all fields')
        }

        updateProject(name, description,status)
    }
  return (
    <div>
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
            </Form.Group>
            <Button type='submit'>Submit</Button>
            </Form>
    </div>
  )
}

export default UpdateProject