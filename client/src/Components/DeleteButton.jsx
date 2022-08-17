import { useMutation } from "@apollo/client"
import { Button } from "react-bootstrap"
import {DELETE_PROJECT} from '../mutations/projectMutation'
import { useNavigate } from "react-router-dom"
import { GET_PROJECTS } from "../queries/projects"

const DeleteButton = ({projectId}) => {
    const navigate = useNavigate()

    const [deleteProject] = useMutation(DELETE_PROJECT,{
        variables: {id: projectId},
        onCompleted: () => navigate('/'),
        refetchQueries: [{query: GET_PROJECTS}]
    })
  return (
    <Button variant="danger" className="mt-4" onClick={deleteProject}>
        Delete
    </Button>
  )
}

export default DeleteButton