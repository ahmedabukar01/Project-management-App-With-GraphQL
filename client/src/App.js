import Header from "./Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'
import Clients from "./Components/Clients";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming){
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming){
            return incoming;
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache, // new InMemoryCache
})

function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Header />
      <div className="container">
        <Clients />
      </div>
      </ApolloProvider>
    </>
  );
}

export default App;
