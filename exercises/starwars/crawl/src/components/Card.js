import React from 'react'

const Card = ({ title, date, director, crawl, producer, episode }) => {
  return (
    <div className='dib card w-100 w-30-ns white bg-black br2 pa4 ma2 tl grow'>
      <h1 className='epinum'>{episode}</h1>
      <h3 className='movie-title f3 pb0 mb2 mt1'>{title}</h3>
      <p className='movie-release-director mt0 pt0'>{date}, {director}</p>
      <p className='mw7 lh-copy opening-crawl ws-normal'>
        "{crawl}"
      </p>
      <div className='card-footer'>
        <p>
          Producers: {producer}
        </p>
      </div>
    </div>
  )
}

export default Card
