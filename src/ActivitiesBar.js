import React, {Component} from 'react'
import ActivityButton from './ActivitiesBarButton'
import './App.css'

class ActivitiesBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      clicked: [false, false, false]
    }

    this.boundHandleScroll = (e) => this.handleScroll(e)
  }

  render () {
    if (!this.state.clicked.every((elem) => elem === false)) {
      return (
        <div className='actBar'>
          <ActivityButton title='breakfast' clicked={this.state.clicked[0]} />
          <ActivityButton title='lunch' clicked={this.state.clicked[1]} />
          <ActivityButton title='dinner' clicked={this.state.clicked[2]} />
        </div>
      )
    } else return null
  }

  componentDidMount () {
    window.addEventListener('scroll', this.boundHandleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.boundHandleScroll)
  }

  handleScroll (e) {
    // TODO: Refactor
    let arr = ['breakfast', 'lunch', 'dinner']
    let ind = arr.findIndex((elem) => document.getElementById(elem).offsetTop - 50 >= e.srcElement.body.scrollTop)
    let newArr = this.state.clicked.map((clicked, index) => index !== arr.length - 1 ? ind - 1 === index : ind === -1)

    this.setState({
      clicked: newArr
    })
  }
}

export default ActivitiesBar
