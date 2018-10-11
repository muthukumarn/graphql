# GraphQL
Running the first GraphQL Server

# Explanation

Book type is extended by adding the type Author.  The Author in Book type is also resolved as an extension (we also use fragment here).

# To Start
yarn start

# Queries
The server is defaulted to use port 8888 and you can access it at http://localhost:8888/graphql

You can run the below query

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

# schema.js -
This is only file modified compared to the preivous branch.

