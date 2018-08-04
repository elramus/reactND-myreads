import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import * as BooksAPI from './BooksAPI'
import SearchResults from './SearchResults'

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
    query.length && this.search(query)
  }

  search = (query) => {
    this.setState({ isSearching: true })
    BooksAPI.search(query).then(results => {
      this.setState({ isSearching: false })
      this.receiveResults(results)
    })
  }

  receiveResults = (results) => {
    // If we got results, look for any matches with existing books
    // and if so, set shelf property.
    results.length && results.forEach(r => {
      this.props.books.forEach(b => {
        r.id === b.id && (r.shelf = b.shelf)
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

        <SearchResults
          isSearching={isSearching}
          query={query}
          results={results}
          shelves={shelves}
          updateBook={updateBook}
        />

      </div>
    )
  }
}

AddBook.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired
}