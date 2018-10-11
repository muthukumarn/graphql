# GraphQL
Running the first GraphQL Server as priamry and second as remote on the first.

# Explanation

This works on the previous sample and adds a remote server.

# To Start
yarn start --this will start the first server which has the dsta and resolvers

yarn start2 --start after the preivous command is running on another windwo and this starts a remover server

# Queries
The first server is defaulted to use port 8888 and you can access it at http://localhost:8888/graphql
The second server is defaulted to use port 8080 and you can access it at http://localhost:8080/graphql

You can run the below query on both the nodes and you should see the same results.  Query is executed on the first server (you can add log messages to validate)

```
query {
  bookById(id:2) {
    name
    author {
      name
    }
  }
  authorById(id:2) {
    id
    age
    name
  }
  titleById(id:2) {
    name
    writer {
      name
    }
  }
  writerById(id:2) {
    id
    age
    name
  }
}
```
# secondserver/schema
schema.js - defines a new setup of schemas.  The schema is similar to the schema in first except Book is called Titles, Authors is called Writers and authorId is called writerId

Data.js - just the same as in firstServer except the authorId is called writerId

# secondServer/app.js -
In addition to retriving the remote schema, we make the excetuable schema based on its own schema.  The local and remote schemas are merged before passing to ApolloServer.


