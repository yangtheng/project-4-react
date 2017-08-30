import React, {Component} from 'react'
import ActivityButton from './ActivitiesBarButton'
import './App.css'

class ActivitiesBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      clicked: [false, false]
    }
  }

  render () {
    return (
      <div className='actBar'>
        <div onClick={() => this.handleClick(0)}>
          <ActivityButton title='breakfast' clicked={this.state.clicked[0]} />
        </div>
        <div onClick={() => this.handleClick(1)}>
          <ActivityButton title='lunch' clicked={this.state.clicked[1]} />
        </div>
      </div>
    )
  }

  handleClick (ind) {
    let arr = this.state.clicked.map((clicked, index) => ind === index)
    this.setState({
      clicked: arr
    })
  }
}

export default ActivitiesBar
