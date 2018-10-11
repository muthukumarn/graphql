const R = require('ramda');
const {gql} = require('apollo-server-express');
const {titles, writers} = require('./data');

const typeDefs = gql`
    type Writer {
        id: Int
        name: String
        age: Int
    }
    type Title {
        id: Int
        name: String
        genre: String
        writerId: Int
    }
    type Query {
        titleById(id: Int) : Title 
        writerById(id: Int): Writer
    }
    extend type Title {
        writer : Writer
    }
`;
const first = R.nth(0);
function restrictTitles(parent, args) {
    return first(R.filter(R.propEq('id',args.id))(titles));
}

function restrictWriters(id) {
    return first(R.filter(R.propEq('id',id))(writers));
}
const resolvers = {
    Query: {
        titleById : (parent, args) => restrictTitles(parent, args),
        writerById : (parent, args) => restrictWriters(args.id)
    },
    Title : {
        writer : {
            fragment: `... on Title {writerId}`,
            resolve (parent, args, context, info) {
                return restrictWriters(parent.writerId);
            }

        }
    }
};

module.exports = {typeDefs, resolvers}
