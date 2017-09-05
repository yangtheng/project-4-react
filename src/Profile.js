import React, {Component} from 'react'
import AddItineraryForm from './AddItineraryForm'
import ItineraryBody from './ItineraryBody'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: props.token,
      currentUser: props.currentUser,
      itineraries: []
    }
  }

  // componentWillReceiveProps (nextProps) {
  //   this.setState({
  //     token: nextProps.token
  //   })
  // }

  render () {
    if (this.state.itineraries.length !== 0) {
      var usertoken = this.state.token
      var boundRenderAllItineraries = () => this.renderAllItineraries()
      var itineraryList = this.state.itineraries.map((e, index) => {
        return <ItineraryBody key={e.id} renderAllItineraries={boundRenderAllItineraries} token={usertoken} itinerary={e} />
      })
    }

    return (
      <div>
        <h1>Profile Page</h1>
        <AddItineraryForm token={this.state.token} renderAllItineraries={() => this.renderAllItineraries()} />
        <h1>Welcome {this.state.currentUser}</h1>
        <div className='container'>
          {itineraryList}
        </div>
      </div>

    )
  } // close render

  renderAllItineraries () {
    return fetch('https://project-4-backend.herokuapp.com/profile',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json'
        }
      } ) // close fetch
    .then(function (response) { return response.json() })
    .then((json) => this.setState({itineraries: json.allItineraries}))
    .catch(function (error) { console.log('error', error) })
  }

  componentDidMount () {
    return fetch('https://project-4-backend.herokuapp.com/profile',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json'
        }
      } ) // close fetch
    .then(function (response) { return response.json() })
    .then((json) => this.setState({itineraries: json.allItineraries}))
    .catch(function (error) { console.log('error', error) })
  }

} // close class

export default Profile
