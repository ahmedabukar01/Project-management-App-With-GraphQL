import Header from "./Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  url: 'http://localhost:8000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Header />
      <div className="container">
        <h1>Hello React Developers</h1>
      </div>
      </ApolloProvider>
    </>
  );
}

export default App;
