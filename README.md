# GraphQL
Running the first GraphQL Server as priamry and second as remote on the first.  Add types in second that extend the first.

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
    writer {
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
# secondserver/schema/schema.js - extend the Book coming from first server and add the field writer

# secondServer/app.js -
We cannot make an executabble schema of the second server since it depends on types from another schema.  So first we exeucte mergeType on that.  Then we merge the remote schema and the mergeType.  We merge them again with the second server resolver.  Finally we make an executablbe schema with the merged schema.

# package.json
Added dependency to do mergeType

# firstServer/schema/schema.js
The fragment should take the reference id (which is AuthorID) in curly brackets. Fixed the typo.


