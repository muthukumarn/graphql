# GraphQL
Running the first GraphQL Server

# Explanation

Book type is extended by adding the type Author.  The Author in Book type is also resolved as an extension (we also use fragment here).

# To Start
yarn start //this will start the first server which has the dsta and resolvers
yarn start2 //start after the preivous command is running on another windwo and this starts a remover server

# Queries
The first server is defaulted to use port 8888 and you can access it at http://localhost:8888/graphql
The second server is defaulted to use port 8080 and you can access it at http://localhost:8080/graphql

You can run the below query on both the nodes and you should see the same results.  Query is executed on the first server (you can add log messages to validate)

```
query {
  bookById(id:2) {
    id
    name
    genre
    authorId
    author {
      id
      name
      age
    }
  }
  authorById(id:2) {
    id
    name
    age
  }
}
```
# package.json
added additional node modules needed for the remote connection.  This requires to run yarn install (or equivalent npm)

# secondServer/app.js -
This is only file modified compared to the preivous branch (other than package.json).
Based on the remote URL a remote schema is generated and an executable schema from the same.

