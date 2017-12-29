import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import axios from 'axios';
import Querystring from 'query-string';
import { HttpLink } from 'apollo-link-http';
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

async function initializeCsrfToken(){
  let result = await axios.get(URL + '/session/token')
    .then(response => {
      return response.data;
    })
    .catch((error) => {
      console.log('error ' + error);
      return null;
    });
  return result;
};

async function initializeOauthToken(){
  let result = await axios.post(URL + '/oauth/token', Querystring.stringify(CONSUMER_CREDENTIALS))
    .then(response => {
      return 'Bearer '.concat(response.data.access_token);
    })
    .catch((error) => {
      console.log('error ' + error);
      return null;
    });

  return result;
};

const initializeHeaders = () => {
  const csrfToken = initializeCsrfToken()
    .then( response => { return response })
    .catch( error => { return null });

  const oAuthToken = initializeOauthToken()
    .then( response => { return response })
    .catch((error) => { return null });
  
  const headers = {
    'X-CSRF-Token': csrfToken,
    authorization: oAuthToken
  };

  return headers;
}


const client = new ApolloClient({
  // link: new HttpLink({ 
  //   uri: URL.concat('/graphql?XDEBUG_SESSION_START=PHPSTORM'),
  //   fetch: customFetch
  // }),
  link: createUploadLink({
    uri: URL.concat('/graphql?XDEBUG_SESSION_START=PHPSTORM'),
    headers: initializeHeaders()
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
