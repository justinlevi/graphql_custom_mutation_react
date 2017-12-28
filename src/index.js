import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import axios from 'axios';
import Querystring from 'query-string';
// import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from "apollo-upload-client/lib/main";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const URL = 'http://contenta.loc';
const CONSUMER_CREDENTIALS = {
  grant_type: 'password',
  client_id: '90f0c0b1-ec7f-47de-a649-454a96e238ab',
  client_secret: 'test1123',
  username: 'test',
  password: 'test'
};

const initializeCsrfToken = () => {
  return axios.get(URL + '/session/token')
    .then(response => {
      return response.data;
    })
    .catch((error) => {
      console.log('error ' + error);
      return null;
    });
};

const initializeOauthToken = () => {
  return axios.post(URL + '/oauth/token', Querystring.stringify(CONSUMER_CREDENTIALS))
    .then(response => {
      return 'Bearer '.concat(response.data.access_token);
    })
    .catch((error) => {
      console.log('error ' + error);
      return null;
    });
};

const initializeHeaders = () => {
  const headers = {
    'X-CSRF-Token': initializeCsrfToken().then(
      (response) => { console.log(response); return response }
    ).catch((error) => {
      console.log('error ' + error);
      return null;
    }),
    authorization: initializeOauthToken().then(
      (response) => { console.log(response); return response }
    ).catch((error) => {
      console.log('error ' + error);
      return null;
    })
  };
  console.log(headers);
  return headers;
}

const client = new ApolloClient({
  // link: new HttpLink({ uri: URL.concat('/graphql') }),
  link: createUploadLink({
    uri: URL.concat('/graphql?XDEBUG_SESSION_START=PHPSTORM'),
    headers: initializeHeaders(),
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
