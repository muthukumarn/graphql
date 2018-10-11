# GraphQL
Running the first GraphQL Server

# Installation

## Prerequisites

###NodeJS
This is tested against node v10.9.0, while it doesnt use any version specific and should work with other version, it has not been verified.

###Yarn
Used yarn intead of npm.  This is tested with yarn v1.5.1

# To Start
yarn start

# Queries
The server is defaulted to use port 8888 and you can access it at http://localhost:8888/graphql

# All data is storied in firstServer/schema/data.js

# schema.js -
defines the schema that has Author and Book
defines 2 queries: bookById and authorById
resolvers with this query connects to corresponding function

# app.js
starts the express server with Apollo (graphql implemetation) as middleware