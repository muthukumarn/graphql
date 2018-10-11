const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { introspectSchema, makeExecutableSchema, makeRemoteExecutableSchema, mergeSchemas } = require('graphql-tools');
const { createHttpLink } = require('apollo-link-http')
const fetch = require('node-fetch')
const {typeDefs, resolvers} = require('./schema/schema');
const { mergeTypes } = require('merge-graphql-schemas');

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

    const mergedTypes = mergeTypes([typeDefs]);

    const mergedSchema = mergeSchemas({
        schemas: [remoteSchema, mergedTypes]});

    const mergeSchemaWithResolver = mergeSchemas({
        schemas: [mergedSchema],
        resolvers
    });

    const server = new ApolloServer({schema : mergeSchemaWithResolver});

    server.applyMiddleware({app});

    app.listen({port:8080},() => {
        console.log(`server ready and listening at http://localhost:8080${server.graphqlPath}`); 
    });

}

run();