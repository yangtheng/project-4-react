import React, {Component} from 'react'
import ActivityButton from './ActivitiesBarButton'
import './App.css'

class ActivitiesBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      clicked: []
    }

    this.boundHandleScroll = (e) => this.handleScroll(e)
  }

  // componentWillReceiveProps (nextProps) {
  //   const newClicked = nextProps.activities.map(activity => false)
  //
  //   this.setState({
  //     clicked: newClicked
  //   })
  // }

  render () {
    let activityButtons = [],
      activityCount = 1
    for (var i = 1; i <= this.props.days; i++) {
      let j = i
      activityButtons.push(<h3 key={j} style={{marginTop: '-1vh'}}>Day {j}</h3>)
      this.props.activities.filter(activity => activity.day === j).forEach(activity => {
        activityButtons.push(<ActivityButton key={activity.id + 9999} id={activity.id.toString()} place={activity.place} title={activity.title} clicked={this.state.clicked[activityCount - 1]} />)
        activityCount += 1
      })
    }
    if (!this.state.clicked.every((elem) => elem === false)) {
      return (
        <div className='actBar'>
          {activityButtons}
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
    let arr = this.props.activities.sort((a, b) => a.day - b.day).map(activity => activity.id.toString())
    let ind = arr.findIndex((elem) => document.getElementById(elem).offsetTop - 100 >= e.srcElement.body.scrollTop)
    let newArr = arr.map((clicked, index) => index !== arr.length - 1 ? ind - 1 === index : ind === -1)
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight && e.srcElement.body.scrollTop > document.getElementById('coverPhoto').offsetHeight) {
      newArr = newArr.map((clicked, index) => index === arr.length - 1)
    }

    this.setState({
      clicked: newArr
    })
  }
}

export default ActivitiesBar
