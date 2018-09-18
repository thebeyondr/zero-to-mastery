import Clarifai from 'clarifai'
import React, {Component} from 'react'
import Particles from 'react-particles-js'
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm'
import Logo from '../components/Logo/Logo'
// import logo from './logo.svg'
import Navigation from '../components/Navigation/Navigation'
import FaceRecognition from './../components/FaceRecognition/FaceRecognition'
import Rank from './../components/Rank/Rank'
import './App.css'
import Signin from '../components/Signin/Signin'
import Register from '../components/Register/Register'

// instantiate a new Clarifai app passing in your api key.
const app = new Clarifai.App({
  apiKey: 'd72c09907eb344318b7393cfa1d0a827'
})

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
  constructor () {
    super()
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedin: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  onInputChange = event => {
    this.setState({input: event.target.value})
  }

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('respImage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    }
  }

  onRouteChange = route => {
    if (route === 'signin') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route})
  }

  displayFaceBox = box => {
    this.setState({box})
  }

  onPictureSubmit = () => {
    this.setState({imageURL: this.state.input})
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          window
            .fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
  }

  render () {
    const {isSignedIn, route, imageURL, box} = this.state
    return (
      <div>
        <Particles className='particles' params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onPictureSubmit}
            />
            <FaceRecognition imageURL={imageURL} box={box} />
          </div>
          : route === 'signin'
            ? <Signin
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
            : <Register
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />}
      </div>
    )
  }
}

export default App
