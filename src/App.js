import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const createNode = gql`
  mutation($input: BasicPageInput!) {
    addPage(input: $input){
      entity{
        ...on NodePage {
          nid
          title
          body{
            value
          }
        }
      }
    }
  }
`;

class App extends Component {

  constructor(props){
    super(props);
    this.createNode = this.createNode.bind(this);
  }

  createNode(target){
    this.props.mutate({ 
        variables: { 
          input : {
            title: "Juniper" + new Date().toLocaleString(),
            body: "Winter"
          } 
        }
      }
    ).then(response => {
      console.log(response)
    })
  }

  render = () => {
    return ( 
      <button >
        <div onClick ={
          () => {this.createNode()}
        } > Create Node</div> 
      </button>
    )
  }
}

export default graphql(createNode)(App);