import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import CookieService from 'service/cookie';

console.log(process.env.BACKOFFICE_SERVICE,"========")
const httpLink = new HttpLink({
  uri: `http://localhost:4002/graphql`,
});

// Create an Apollo Link to dynamically set the Authorization header
const authLink = new ApolloLink((operation, forward) => {
  const token = CookieService.getUnifiedToken(); // Fetch token dynamically
  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return forward(operation);
});

// Combine the authLink with the httpLink
const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
