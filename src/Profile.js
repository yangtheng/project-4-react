import React, {Component} from 'react'
import AddItineraryForm from './AddItineraryForm'
import ItineraryBody from './ItineraryBody'
import Spinner from './Spinner'
import {Panel, Alert} from 'react-bootstrap'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: props.token,
      currentUser: props.currentUser,
      itineraries: [],
      loading: true,
      itineraryCreated: false,
      itineraryDeleted: false
    }
  }

  render () {
    let successfulCreateAlert, successfulDeleteAlert
    if (this.state.itineraryCreated) {
      successfulCreateAlert = (
        <Alert bsStyle="success" onDismiss={() => this.closeSuccessfullyCreated()}>
          <strong>Itinerary successfully created!!</strong>
        </Alert>
      )
    }
    if (this.state.itineraryDeleted) {
      successfulDeleteAlert = (
        <Alert bsStyle="danger" onDismiss={() => this.closeSuccessfullyDeleted()}>
          <strong>Itinerary successfully deleted!!</strong>
        </Alert>
      )
    }
    if (this.state.itineraries.length !== 0) {
      var usertoken = this.state.token
      var boundRenderAllItineraries = () => this.handleItineraryDeletion()
      var itineraryList = this.state.itineraries.map((e, index) => {
        return <ItineraryBody key={e.id} renderAllItineraries={boundRenderAllItineraries} token={usertoken} itinerary={e} />
      })
    }
      if (this.state.loading) {
        return (
          <Spinner loading={this.state.loading} />
        )
      } else {
        return (
      <div>
        {successfulCreateAlert}
        {successfulDeleteAlert}
        <div className='container' style={{marginTop: '10vh'}}>
            <Panel className="col-sm-6" style={{ height: '30vh', position: 'relative', width: '49%', float: 'left', padding:'0', textAlign:'center', marginRight: '1%'}}>
              <h3>Going somewhere?</h3>
              <AddItineraryForm token={this.state.token} renderAllItineraries={() => this.handleItineraryCreation()} />
            </Panel>
          {itineraryList}
        </div>
      </div>
      )
    }
  } // close render

  handleItineraryDeletion () {
    this.renderAllItineraries()
    this.setState({
      itineraryDeleted: true
    })
  }

  handleItineraryCreation () {
    this.renderAllItineraries()
    this.setState({
      itineraryCreated: true
    })
  }

  closeSuccessfullyCreated () {
    this.setState({
      itineraryCreated: false
    })
  }

  closeSuccessfullyDeleted () {
    this.setState({
      itineraryDeleted: false
    })
  }

  renderAllItineraries () {
    return fetch('https://project-4-backend.herokuapp.com/profile',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json'
        }
      }) // close fetch
    .then(function (response) { return response.json() })
    .then((json) => this.setState({
      itineraries: json.allItineraries,
      loading: false
    }))
    .catch(function (error) { console.log('error', error) })
  }

  componentDidMount () {
    this.renderAllItineraries()
  } // close class
}

export default Profile
