import React, {Component} from 'react'
import AddItineraryForm from './AddItineraryForm'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: props.token,
      itineraries: []
    }
  }

  // componentWillReceiveProps (nextProps) {
  //   this.setState({
  //     token: nextProps.token
  //   })
  // }

  render () {
    console.log('all itinerary', this.state.itineraries)
    console.log('token', this.state.token)

    if (this.state.itineraries.length !== 0) {
      var itineraryList = this.state.itineraries.map(function(e, index) {
        return <h3 key={index}>{e.country}</h3>
        // <insert component here and pass it each itinerary as props>
      })
      console.log('list', itineraryList)
    }

    return (
      <div>
        <h1>Profile Page</h1>
        <AddItineraryForm token={this.state.token}/>
        <h1>Welcome Dom Phua!</h1>
        <small>{this.state.token}</small>
        {itineraryList}
      </div>

    )
  } // close render

  componentDidMount () {
    // return fetch('https://project-4-backend.herokuapp.com/profile',
    return fetch('http://localhost:3000/profile',
      {
        method: 'GET',
        headers: {
          // 'Authorization': 'Bearer 0fb1c49fb01007db0f9edb4d8e84cb15601d0d5df9ca5b2fc72a37587de72f19',
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json'
        }
      } ) // close fetch
    .then(function (response) { return response.json() })
    .then((json) => this.setState({itineraries: json.allItineraries}))
    // .then((json) => console.log(json))
    .catch(function (error) { console.log('error', error) })
  }

} // close class

export default Profile
