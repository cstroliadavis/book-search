import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
        bookCount
        savedBooks {
          bookId
          title
          description
          image
          authors
          link
        }
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($password: String!, $email: String) {
    login(password: $password, email: $email) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          title
          description
          image
          authors
          link
        }
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        description
        image
        authors
        link
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookId: String!, $title: String!, $description: String!, $image: String, $authors: [String], $link: String) {
    saveBook(bookId: $bookId, title: $title, description: $description, image: $image, authors: $authors, link: $link) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        description
        image
        authors
        link
      }
    }
  }
`;
