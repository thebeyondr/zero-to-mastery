import React, { Component } from 'react'
import './App.css'
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm'
import Logo from '../components/Logo/Logo'
import Rank from '../components/Rank/Rank'
import Particles from 'react-particles-js'
// import logo from './logo.svg'
import Navigation from '../components/Navigation/Navigation'

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
class App extends Component {
  render () {
    return (
      <div>
        <Particles className='particles' params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
      </div>
    )
  }
}

export default App
