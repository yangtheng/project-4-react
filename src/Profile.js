import React, {Component} from 'react'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: props.token,
      itineraries: []
    }
  } // close constructor
  render () {
    console.log('all itinerary', this.state.itineraries)
    //
    // if (this.state.itineraries.length !== 0) {
    //   var itineraryList = this.state.itineraries.map(function(e, index) {
    //     return <h3 key={index}>{e.country}</h3>
    //     // <insert component here and pass it each itinerary as props>
    //   })
    //   console.log('list', allItinerariesList)
    // }

    return (
      <div>
        <h1>Profile Page</h1>
        <h1>Welcome Dom Phua!</h1>
        <small>{this.props.token}</small>
        {/* {allItinerariesList} */}
      </div>

    )
  } // close render

  componentDidMount () {
    return fetch('https://project-4-backend.herokuapp.com/profile',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer 4775e26f595b1e090d8e8071bcddbcc4719d5150cce47153e4c3e5599f58f616',
          // take bearer token from local storage?
          'Content-Type': 'application/json'
        }
      } ) // close fetch
    .then(function (response) { return response.json() })
    // .then((json) => this.setState({itineraries: json.allItineraries}))
    .then((json) => console.log(json))
    .catch(function (error) { console.log('error', error) })
  }

} // close class

export default Profile
