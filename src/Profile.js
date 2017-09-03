import React, {Component} from 'react'

class Profile extends Component {
  constructor(props){
    super(props)

    this.state = {
      token: props.token,
      itineraries: []
    }
  }

  render () {
    return (
      <div>
        <h1>Welcome Dom Phua!</h1>
        <small>{this.props.token}</small>
      </div>
    )
  }
}

export default Profile
