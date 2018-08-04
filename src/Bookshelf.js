import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const Bookshelf = (props) => {
  const { shelves, books, title, updateBook } = props

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <li key={book.id}>
              <Book
                book={book}
                shelves={shelves}
                updateBook={updateBook}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Bookshelf

Bookshelf.propTypes = {
  shelves: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  updateBook: PropTypes.func.isRequired
}