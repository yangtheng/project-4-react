import React, {Component} from 'react'
import {Button, Modal, PanelGroup, Panel, Glyphicon} from 'react-bootstrap'

class ItineraryBody extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: props.token,
      itinerary_id: props.itinerary.id,
      itinerary: props.itinerary
    }
    this.renderAllItineraries = props.renderAllItineraries
  }

  render () {
    return (
      <Panel>
        <h3>Itinerary id is: {this.state.itinerary_id}</h3>
        <small>Token: {this.state.token}</small>
        <h3>Title: {this.state.itinerary.title}</h3>
        <h3>Country: {this.state.itinerary.country}</h3>
        <h3>Days: {this.state.itinerary.days}</h3>
        <h3>BannerUrl: {this.state.itinerary.bannerUrl}</h3>
        <Button onClick={() => this.deleteItinerary()} bsStyle='danger' style={{float: 'right', marginRight: '3vh'}}>Delete</Button>
        <Button bsStyle='info' style={{float: 'right', marginRight: '3vh'}}>Edit this itinerary</Button>
      </Panel>

    ) // close return
  } // close render

  deleteItinerary () {
    var confirmDelete = window.confirm('Are you sure you want to delete this itinerary? All activities and photos are not recoverable.')
    if (confirmDelete) {
      fetch('https://project-4-backend.herokuapp.com/profile/' + this.state.itinerary_id,
        {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + this.state.token,
            'Content-Type': 'application/json'
          }
        }) // close fetch
      .then(function (response) { return response.json() })
      .then(res => {
        if (res.status === 200) {
          alert('Successfully deleted!')
          this.renderAllItineraries()
        }
        return res.json()
      })
      .catch(function (error) { console.log('error', error) })
    } // close if

  } //close deleteItinerary fxn

} // close class

export default ItineraryBody
