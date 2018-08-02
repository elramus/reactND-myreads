import React from 'react'
import { Link } from 'react-router-dom'

const SearchButton = () => {
  return (
    <div className="open-search">
      <Link to="/add">Add a book</Link>
    </div>
  )
}

export default SearchButton