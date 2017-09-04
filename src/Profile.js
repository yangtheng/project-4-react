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
        return <div>
          <h3>Title: {e.title}</h3>
          <h3>Country: {e.country}</h3>
          <h3>Days: {e.days}</h3>
          <h3>BannerUrl: {e.bannerUrl}</h3>
        </div>
        // <insert component here and pass it each itinerary as props>
      })
      console.log('list', itineraryList)
    }

    return (
      <div>
        <h1>Profile Page</h1>
        <AddItineraryForm token={this.state.token} addItinerary={() => this.addItinerary()}/>
        <h1>Welcome username here</h1>
        {itineraryList}
      </div>

    )
  } // close render

  addItinerary () {
    // fetch()
    // .then(this.setState({}))
    return fetch('https://project-4-backend.herokuapp.com/profile',
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

  componentDidMount () {
    // return fetch('https://project-4-backend.herokuapp.com/profile',
    return fetch('https://project-4-backend.herokuapp.com/profile',
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
