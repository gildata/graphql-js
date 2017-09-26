/*

var {graphql, buildSchema} = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = {
    hello: () => 'Hello world!'
};

graphql(schema, '{ hello }', root)
.then((response) => {
    console.log(response);
});

*/


import {graphql, buildSchema} from 'graphql';
const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = {
    hello: () => 'Hello world!'
};

graphql(schema, '{ hello }', root)
.then((response) => {
    console.log(response);
    // ???
});