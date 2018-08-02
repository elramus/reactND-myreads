import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

export default class AddBook extends Component {
  state = {
    query: '',
    results: [],
    isSearching: false,
    showSearchBar: false
  }

  inputRef = React.createRef()

  onInputChange = (e) => {
    const query = e.target.value
    this.setState({ query })
    // no need to send empty query to API
    query.length && this.search(e.target.value)
  }

  search = (query) => {
    this.setState({ isSearching: true })
    BooksAPI.search(query).then(results => {
      this.setState({ isSearching: false })
      this.receiveResults(results)
    })
  }

  receiveResults = (results) => {
    // if we got results, give them the shelf property
    results.length && results.forEach(r => {
      this.props.books.forEach(b => {
        r.id === b.id ? r.shelf = b.shelf : r.shelf = 'none'
      })
    })
    this.setState({ results })
  }

  componentDidMount() {
    // animate the input into place
    this.setState({ showSearchBar: true })
    // set cursor in input
    this.inputRef.current.focus()
  }

  render() {
    const { query, results, showSearchBar, isSearching } = this.state
    const { shelves, updateBook } = this.props

    return (
      <div className="search-books">

        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <CSSTransition in={showSearchBar} timeout={300} classNames="input">
              <input ref={this.inputRef} type="text" placeholder="Search by title or author" onChange={this.onInputChange} />
            </CSSTransition>
          </div>
        </div>

        <div className="search-books-results">
          {query.length ? (
            results.length ? (
              <ol className="books-grid">
                {results.map(book => (
                  <li key={book.id}>
                    <Book book={book} shelves={shelves} updateBook={updateBook} />
                  </li>
                ))}
              </ol>
            ) : !isSearching && (
              <h3>No results found from '{query}'</h3>
            )
          ) : (
            <div className='search-books-hint'>
              <h3>Hint: Trying looking for one of these keywords</h3>
              <p>'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'</p>
            </div>
          )}
        </div>

      </div>
    )
  }
}

AddBook.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired
}