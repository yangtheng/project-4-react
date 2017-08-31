import React, {Component} from 'react'
import ActivityButton from './ActivitiesBarButton'
import './App.css'

class ActivitiesBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      clicked: [false, false, false]
    }
  }

  render () {
    return (
      <div className='actBar'>
        <ActivityButton title='breakfast' clicked={this.state.clicked[0]} />
        <ActivityButton title='lunch' clicked={this.state.clicked[1]} />
        <ActivityButton title='dinner' clicked={this.state.clicked[2]} />
      </div>
    )
  }

  componentDidMount () {
    window.addEventListener('scroll', (e) => this.handleScroll(e))
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', (e) => this.handleScroll(e))
  }

  handleScroll (e) {
    // TODO: Refactor
    let arr = ['breakfast', 'lunch', 'dinner']
    let ind = arr.findIndex((elem) => document.getElementById(elem).offsetTop - 50 >= e.srcElement.body.scrollTop)
    let newArr = this.state.clicked.map((clicked, index) => {
      if (index !== arr.length - 1) return ind - 1 === index
      else return ind === -1
    })
    this.setState({
      clicked: newArr
    })
  }
}

export default ActivitiesBar
