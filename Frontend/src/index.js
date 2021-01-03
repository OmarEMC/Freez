import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

import config from './extra/config';
import App from './App';

const link = createHttpLink({
  uri: `${config.authURL}/graphql`,
  credentials: "include",
})

const client = new ApolloClient({
  link,
  connectToDevTools: false,
  cache: new InMemoryCache()
})

ReactDOM.render((
  <ChakraProvider theme={theme}>
    <CSSReset />
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  </ChakraProvider>),
  document.getElementById('root')
);