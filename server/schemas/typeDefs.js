const { gql } = require('apollo-server-express');

module.exports = gql`
  type Auth {
    token: ID!
    user: User
  }

  type Book {
    bookId: String!
    title: String!
    description: String!
    image: String
    authors: [String]
    link: String
  }

  type User {
    _id: ID
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }
  
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    deleteBook(bookId: String!): User
    login(email: String, password: String!): Auth
    saveBook(authors: [String], description: String!, title: String!, bookId: String!, image: String, link: String): User
  }

  type Query {
    me: User
  }
`;
