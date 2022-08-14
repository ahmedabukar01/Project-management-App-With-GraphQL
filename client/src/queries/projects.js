import {gql} from '@apollo/client'

const GET_PROJECTS = gql`
query GetProjects {
    projects{
        id
        name
        status


    }
}
`

// get single Query
const GET_SINGLE_PRO = gql`
query GetSinglePro($id: ID!) {
    project(id: $id){
        id
        name
        description
        status
        client {
            id
            name
            email
            phone
        }
    }
}
`

export {GET_PROJECTS, GET_SINGLE_PRO}