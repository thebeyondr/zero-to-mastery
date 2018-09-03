import React from 'react'

const SearchBox = ({ searchField, searchChange }) => {
  return (
    <div className='mb2'>
      <input
        className='pa2'
        type='search'
        placeholder='Search Robots'
        onChange={searchChange}
      />
    </div>
  )
}

export default SearchBox
