import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'https://njimarnjimrapsht.myshopify.com/api/2020-10/graphql.json',
  });

const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        'X-Shopify-Storefront-Access-Token': '9d384b4c3258cbfc2e507ed639f348b4'
      }
    }
  });

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;