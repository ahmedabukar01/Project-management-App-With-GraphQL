import Header from "./Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Clients from "./Components/Clients";
import AddClientModel from "./Components/AddClientModel";
import Projects from "./Components/Projects";
import NotFound from "./pages/NotFound";

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
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={
              <>
                  <div className="d-flex gap-3 mb-4">
                  <AddClientModel />
                  </div>
                  <Projects />
                  <hr />
                  <Clients />
              </>
            }/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </div>
      </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
