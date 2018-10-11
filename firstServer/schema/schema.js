const R = require('ramda');
const {gql} = require('apollo-server-express');
const {books, authors} = require('./data');

const typeDefs = gql`
    type Author {
        id: Int
        name: String
        age: Int
    }
    type Book {
        id: Int
        name: String
        genre: String
        authorId: Int
    }
    type Query {
        bookById(id: Int) : Book 
        authorById(id: Int): Author
    }
    extend type Book {
        author : Author
    }
`;
const first = R.nth(0);
function restrictBooks(parent, args) {
    return first(R.filter(R.propEq('id',args.id))(books));
}

function restrictAuthors(id) {
    return first(R.filter(R.propEq('id',id))(authors));
}
const resolvers = {
    Query: {
        bookById : (parent, args) => restrictBooks(parent, args),
        authorById : (parent, args) => restrictAuthors(args.id)
    },
    Book : {
        author : {
            fragment: `... on Book {authorId}`,
            resolve (parent, args, context, info) {
                return restrictAuthors(parent.authorId);
            }

        }
    }
};

module.exports = {typeDefs, resolvers}
