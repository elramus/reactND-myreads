import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const SearchResults = (props) => {
  const { isSearching, query, results, shelves, updateBook } = props

  return (
    <div className="search-books-results">
      {query.length ? (
        results.length ? ( // yes there's a query, and yes there are results
          <ol className="books-grid">
            {results.map(book => (
              <li key={book.id}>
                <Book book={book} shelves={shelves} updateBook={updateBook} />
              </li>
            ))}
          </ol>
        ) : !isSearching && ( // yes there's a query, but there are no results
          <h3>No results found from '{query}'</h3>
        )
      ) : ( // no query, no results
          <div className='search-books-hint'>
            <h3>Hint: Trying looking for one of these keywords</h3>
            <p>'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'</p>
          </div>
        )}
    </div>
  )
}

export default SearchResults

SearchResults.propTypes = {
  isSearching: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired
}