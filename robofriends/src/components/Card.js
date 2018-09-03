import React from 'react'

const Card = ({ id, name, email }) => {
  return (
    <div className='tc dib grow pa3 br3 ma2 bw2 shadow-hover ba-ns b--light-gray bg-near-white'>
      <img alt='robots' src={`https://robohash.org/${id}?size=200x200`} />
      <div>
        <h3>{name}</h3>
        <p>{email}</p>
      </div>
    </div>
  )
}

export default Card
