const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const {typeDefs, resolvers} = require('./schema/schema');
const { makeExecutableSchema } = require('graphql-tools');

const app = express();

const schema = makeExecutableSchema ({typeDefs, resolvers});

//const server = new ApolloServer({typeDefs, resolvers});
const server = new ApolloServer({schema : makeExecutableSchema ({typeDefs, resolvers})});
server.applyMiddleware({app});

app.listen({port:8888},() => {
    console.log(`server ready and listening at http://localhost:8888${server.graphqlPath}`); 
});
