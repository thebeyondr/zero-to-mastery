import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
  return (
    <div>
      <p className='f3 center'>{'Detect faces in the images you link!'}</p>
      <div className='center'>
        <div className='form pa4 br2 shadow-4 center'>
          <input
            type='text'
            className='f4 pa2 w-70 center'
            onChange={onInputChange}
          />
          <button
            className='w-30 f4 link ph3 pv2 dib bn white bg-light-purple bg-animate hover-bg-purple'
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm
