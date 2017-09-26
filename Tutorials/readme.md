http://graphql.org/learn/

http://graphql.org/code/#javascript

```sh

$ npm i -D graphql

$ npm i -S graphql

```

Then run `node hello.js` with this code in `hello.js`:

```js

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

```

http://graphql.org/code/#express-graphql-graphql-js-running-an-express-graphql-server-github-https-github-com-graphql-express-graphql-npm-https-www-npmjs-com-package-express-graphql

```sh

$ npm i -D express express-graphql graphql

$ npm i -S express express-graphql graphql

```

Then run `node server.js` with this code in `server.js`:

```js

/* 

var express = require('express');
var graphqlHTTP = require('express-graphql');
var {buildSchema} = require('graphql');

var schema = buildSchema(`
    type Query {
        hello: String
    }
`);

var root = {
    hello: () => 'Hello world!'
};

var app = express();
app.use('/graphql', graphqlHTTP({schema: schema, rootValue: root, graphiql: true}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

*/

import {express} from 'express';
import graphqlHTTP from 'express-graphql';
import {buildSchema} from 'graphql';

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = {
    hello: () => 'Hello world!'
};

const app = express();
app.use(
    '/graphql', 
    graphqlHTTP(
        {
            schema: schema,
            rootValue: root,
            graphiql: true
        }
    )
);
app.listen(
    4000,
    () => {
        return console.log('Now browse to localhost:4000/graphql');
    }
);

```

https://github.com/apollographql/apollo-server

http://dev.apollodata.com/tools/apollo-server/index.html

```sh

$ npm i -D graphql-server-express body-parser express graphql graphql-tools

$ npm i -S graphql-server-express body-parser express graphql graphql-tools

```
http://graphql.org/code/#graphql-server-http-dev-apollodata-com-tools-graphql-server-index-html-github-https-github-com-apollostack-graphql-server-npm-https-www-npmjs-com-package-graphql-server-express

Then run `node server.js` with this code in `server.js`:

```js

/*

var express = require('express');
var bodyParser = require('body-parser');
var {graphqlExpress, graphiqlExpress} = require('graphql-server-express');
var {makeExecutableSchema} = require('graphql-tools');

var typeDefs = [`
type Query {
  hello: String
}

schema {
  query: Query
}`];

var resolvers = {
    Query: {
        hello(root) {
            return 'world';
        }
    }
};

var schema = makeExecutableSchema({typeDefs, resolvers});
var app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));

*/


import {express} from 'express';
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express';
import {makeExecutableSchema} from 'graphql-tools';



const typeDefs = [`
    type Query {
        hello: String
    }
    schema {
        query: Query
    }
`];

const resolvers = {
    Query: {
        hello(root) {
            return 'world';
        }
    }
};

const schema = makeExecutableSchema(
    {
        typeDefs,
        resolvers
    }
);

const app = express();

app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({schema})
);

app.use(
    '/graphiql',
    graphiqlExpress({endpointURL: '/graphql'})
);

app.listen(
    4000, () => {
        return console.log('Now browse to localhost:4000/graphiql');
    }
);



```


https://www.howtographql.com/

***

https://github.com/gildata/graphql-js/issues/1#issuecomment-332059774
