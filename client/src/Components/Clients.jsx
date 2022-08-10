import {gql, useQuery} from '@apollo/client'
import ClientRow from './ClientRow'

const GET_CLIENTS = gql`
query GetClients {
    clients {
        id
        name
        email
        phone
    }
}
`

const Clients = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS)

    if(loading) return <p>loading...</p>
    if(error) return <p>error...</p>;

  return <>
        {!loading && !error && (
            <table className='table table-hover mt-3'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(client=>{
                        <ClientRow key={client.id} client={client} />
                    })}
                </tbody>
            </table>
        )}
    </>
}

export default Clients