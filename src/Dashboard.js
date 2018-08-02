import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import Bookshelf from './Bookshelf'
import SearchButton from './SearchButton'

export default class Dashboard extends Component {
  state = {
    showAddButton: false
  }

  componentDidMount() {
    // animate the search button entrance after 300ms
    setTimeout(() => {
      this.setState({ showAddButton: true })
    }, 300)
  }

  render() {
    const { books, shelves, updateBook } = this.props
    const { showAddButton } = this.state

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>Luke's MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.map(shelf => (
            <Bookshelf
              key={shelf.dbName}
              title={shelf.title}
              books={books.filter(book => book.shelf === shelf.dbName)}
              shelves={shelves}
              updateBook={updateBook}
            />
          ))}
        </div>
        <CSSTransition mountOnEnter in={showAddButton} timeout={300} classNames="open-search">
          <SearchButton/>
        </CSSTransition>
      </div>
    )
  }
}

Dashboard.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired
}