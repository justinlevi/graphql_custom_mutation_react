Simple proof of concept to execute a graphql mutation on a Contenta drupal site

#Step 1 - Drupal: Get Contenta, OAuth, and GraphQl setup and working
Get a Contenta site up and running first and create a role, user, and client with permissions to create a page node as well as execute graphql queries. 

#Step 2 - Download and enable the graphql_custom_mutation module here
https://github.com/justinlevi/graphql_custom_mutation


#Step3 - React: configure to your above setup
modify `src/index.js` with your domain and credentials

```
const URL = 'http://contenta.loc';
const CONSUMER_CREDENTIALS = {
  grant_type: 'password',
  client_id: '90f0c0b1-ec7f-47de-a649-454a96e238ab',
  client_secret: 'test1123',
  username: 'test',
  password: 'test'
};
```

$ `yarn install`
$ `yarn start`