import React from 'react'
import Card from './Card'
const toRoman = require('roman-numerals').toRoman

const CardList = ({ films }) => {
  return (
    <div>
      {films.map(film => {
        return (
          <Card
            title={film.title}
            episode={toRoman(film.episode_id)}
            date={film.release_date.substring(0, 4)}
            director={film.director}
            producer={film.producer}
            crawl={film.opening_crawl}
          />
        )
      })}
    </div>
  )
}

export default CardList
