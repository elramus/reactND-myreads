import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Book extends Component {
  state = {
    shelfDbName: this.props.book.shelf || 'none' // https://stackoverflow.com/a/47341539/3242159
  }

  onShelfMenuChange = (e) => {
    this.setState({ shelfDbName: e.target.value })
    this.updateBookShelf(e.target.value)
  }

  updateBookShelf(shelfDbName) {
    this.props.updateBook(this.props.book, 'shelf', shelfDbName)
  }

  render() {
    const { book, shelves } = this.props

    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks && book.imageLinks.thumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.shelfDbName} onChange={this.onShelfMenuChange}>
                <option value="move" disabled>Move to...</option>
                  {shelves.map(shelf => (
                    <option key={shelf.dbName} value={shelf.dbName}>{shelf.title}</option>
                  ))}
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {/* If no author, fall back to publisher, if no publisher, display 'author unknown' */}
          <div className="book-authors">{book.authors ? book.authors.join(', ') : book.publisher ? book.publisher : 'Author unknown'}</div>
        </div>
    )
  }
}

Book.propTypes = {
  shelves: PropTypes.array.isRequired,
  book: PropTypes.object.isRequired,
  updateBook: PropTypes.func.isRequired
}