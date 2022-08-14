import Spinner from './Spinner'
import {GET_PROJECTS} from '../queries/projects'
import { useQuery } from '@apollo/client'
import ProjectCard from './ProjectCard';

const Projects = () => {
    const {loading, error, data} = useQuery(GET_PROJECTS);

    if(loading) return <p>{loading} ...</p>
    if(error) return <p>something is wrong...</p>

    console.log(loading, error, data)
  return (
    <div>
       {data.projects.length > 0 ? (
       <div className='row mt-4'>
        {data.projects.map(project=>(
            <ProjectCard key={project.id} project={project}/>
        ))}
       </div>) : (<p>No Projects</p>)}
    </div>
  )
}

export default Projects