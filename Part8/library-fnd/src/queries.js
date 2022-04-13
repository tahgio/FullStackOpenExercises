import { gql, useQuery } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const ME = gql`
query {
  me {
    username
    favoriteGenre
    id
  }
}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name 
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
        born
        bookCount
        id
      }
      genres
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation addBook(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]!) {
      addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres) {
          title
          published
          author {
            name
            born
            bookCount
            id
          }
          genres
          id
        }

    }
`

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
      id
  }
}
`

export const FAV_BOOKS = gql`
  query favBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
        born
        bookCount
        id
      }
    genres
    id
    }
  }
`
