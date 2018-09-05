import React, { Component } from 'react'
import CardList from '../components/CardList'
import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      films: []
    }
  }

  componentDidMount () {
    window
      .fetch('https://swapi.co/api/films/')
      .then(resp => resp.json())
      .then(data => data.results)
      .then(films => this.setState({ films }))
  }

  render () {
    const { films } = this.state
    return !films.length
      ? <h1>LOADING ...</h1>
      : <div className='tc bt bw2 b--yellow'>
        <h3 className='f3'> STAR WARS CRAWLR</h3>
        <CardList films={films} />
      </div>
  }
}

export default App
