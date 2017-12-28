import React, { Component } from 'react';


import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import RecursiveIterator from 'recursive-iterator';
import objectPath from 'object-path';


class App extends Component {

  // state = {
  //     csrfToken: '',
  //     oauthToken: {}
  // };

  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(target){

    const formData  = new FormData();
    
    // search for File objects on the request and set it as formData
    for(let { node, path } of new RecursiveIterator(target.variables)) {
        if (node instanceof File) {
            const id = Math.random().toString(36);
            formData.append(id, node);
            objectPath.set(target.variables, path.join('.'), id);
        }
    }
    // Display the key/value pairs
    // for (var pair of formData.entries()) {
    //   console.log(pair);
    // }

    // 
    // this.props.mutate({ variables: { file: target} })
    this.props.mutate({ 
        variables: { 
          input : {
            file: target.files[0].name,
            // files: target.files[0]
          } 
        }
      }
    ).then(response => {
      console.log(response)
    })
  }

  render = () => {
    return ( 
        <input
          type="file"
          required
          onChange={({ target }) => {
            target.validity.valid && this.handleChange(target)
            }
          }
        />
    )
  }

}


const submitFile = gql`
  mutation($input: FileInput!) {
    uploadFile(input: $input)
  }
`;

// const submitFile = gql`
//   mutation($file: FileInput!) {
//     uploadFile(input: $file){
//       entity{
//         ...on FileFile {
//           url
//         }
//       }
//     }
//   }
// `;

export default graphql(submitFile)(App);