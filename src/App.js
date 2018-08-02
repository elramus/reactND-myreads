import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Dashboard from './Dashboard'
import AddBook from './AddBook'
import './App.css'

export default class App extends React.Component {
  state = {
    books: [],
    shelves: [
      // Default shelves
      // TODO: User can add their own custom shelves
      {
        title: 'Currently Reading',
        dbName: 'currentlyReading'
      }, {
        title: 'Want to Read',
        dbName: 'wantToRead'
      }, {
        title: 'Read',
        dbName: 'read'
      }
    ]
  }

  receiveBooks(books) {
    // TODO: only add in books that aren't in state already, rather than blowing
    // away all books every time with new payload
    this.setState({ books })
  }

  refreshBooks() {
    BooksAPI.getAll().then(books => this.receiveBooks(books))
  }

  updateBook = (book, attribute, value) => {
    if (attribute === 'shelf') {
      // make updated book object
      const updatedBook = {
        ...book,
        [attribute]: value
      }
      // update the book in state by removing old book and adding new
      this.setState(prevState => {
        const books = prevState.books.filter(b => b.id !== book.id)
        books.push(updatedBook)
        return { books }
      })
      // update the book in the DB
      BooksAPI.update(book, value)
    } else {
      alert(`Sorry, updating a book's ${attribute} is not supported yet!`)
    }
  }

  componentDidMount() {
    this.refreshBooks()
  }

  render() {
    const { books, shelves } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Dashboard books={books} shelves={shelves} updateBook={this.updateBook} />
        )} />
        <Route path="/search" render={() => (
          <AddBook books={books} shelves={shelves} updateBook={this.updateBook} />
        )} />
      </div>
    )
  }
}