const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { introspectSchema, makeExecutableSchema, makeRemoteExecutableSchema, mergeSchemas } = require('graphql-tools');
const { createHttpLink } = require('apollo-link-http')
const fetch = require('node-fetch')
const {typeDefs, resolvers} = require('./schema/schema');

const app = express();

// 1. Create Apollo Link that's connected to the underlying GraphQL API
const link = () => createHttpLink({
    uri: `http://localhost:8888/graphql/`,
    fetch
});

async function run() {
    // 2. Retrieve schema definition of the underlying GraphQL API
    const schema = await introspectSchema(link());

    // 3. Create the executable schema based on schema definition and Apollo Link
    const remoteSchema = makeRemoteExecutableSchema({
        schema: schema,
        link: link()
        });

    const localSchema = makeExecutableSchema ({typeDefs, resolvers}); 

    const mergeSchema = mergeSchemas({schemas: [remoteSchema, localSchema]});

    const server = new ApolloServer({schema : mergeSchema});

    server.applyMiddleware({app});

    app.listen({port:8080},() => {
        console.log(`server ready and listening at http://localhost:8080${server.graphqlPath}`); 
    });

}

run();