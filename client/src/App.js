import Header from './components/Header'
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import Client from "./components/Clients"
import AddClientModal from './components/Modal/AddClientModal'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming){
            return incoming
          }
        },
        projects: {
          merge(existing, incoming){
            return incoming
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <div className='container'>
          <h1>Hello World</h1>
          <AddClientModal />
          <Client />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
