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
    // console.log('all itinerary', this.state.itineraries)
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

  // componentDidMount () {
  //   return fetch('http://localhost:3000/profile',
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': 'Bearer fb26bfd616c76d10ede999d0d6bab575f03d7dc26c90de01adc501f4381118a3',
  //         // take bearer token from local storage?
  //         'Content-Type': 'application/json'
  //       }
  //     } ) // close fetch
  //   .then(function (response) { return response.json() })
  //   .then((json) => this.setState({allItineraries: json.allItineraries}))
  //   // .then((json) => console.log(json.allItineraries))
  //   .catch(function (error) { console.log('error', error) })
  // }

} // close class

export default Profile
