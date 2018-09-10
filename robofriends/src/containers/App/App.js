import React, { Component } from 'react'
import CardList from '../../components/CardList'
import Scroll from '../../components/Scroll'
import SearchBox from '../../components/SearchBox'
import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      robots: [],
      searchField: ''
    }
  }
  onSearchChange (event) {
    this.setState({ searchField: event.target.value })
  }
  componentDidMount () {
    window
      .fetch('https://jsonplaceholder.typicode.com/users')
      .then(data => data.json())
      .then(robots => {
        this.setState({ robots })
      })
  }
  render () {
    const { robots, searchField } = this.state
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })
    return !robots.length
      ? <h1>L O A D I N G...</h1>
      : <div className='tc'>
        <h1 className='f1'>Robofriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
  }
}

export default App
