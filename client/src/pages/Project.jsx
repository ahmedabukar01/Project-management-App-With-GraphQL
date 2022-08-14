import { GET_SINGLE_PRO } from "../queries/projects"
import { useQuery } from "@apollo/client"
import { useParams, Link } from "react-router-dom";
import Spinner from "../Components/Spinner";
import ClientInfo from "../Components/ClientInfo";


const Project = () => {
  const {id} = useParams();
  const {loading, error , data} = useQuery(GET_SINGLE_PRO,{
    variables: {id}
  });

  if(loading) return <Spinner />
  if(error) return <p>Something Went Wrong...</p>
  return (
    <>
        {!loading && !error && (
          <div className="mx-auto w-75 card p-5">
            <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">Go Back</Link>

            <h1>{data.project.name}</h1>
            <p>{data.project.description}</p>
            <h5 className="mt-3">Project Status</h5>
            <p className="lead">{data.project.status}</p>

            <ClientInfo client={data.project.client}/>
          </div>
        )}
    </>
  )
}

export default Project