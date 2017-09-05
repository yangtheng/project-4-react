import React, {Component} from 'react'
import {Button, Panel} from 'react-bootstrap'
import {
  Link
} from 'react-router-dom'

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
      <Panel className="col-sm-6" style={{backgroundImage: 'url(' + this.state.itinerary.bannerUrl + ')', backgroundSize: 'cover', height: '30vh', position: 'relative', width: '50%', float: 'left'}}>
        <h3 style={{color: 'white', fontWeight: 'bold', textShadow: 'black 0.1em 0.1em 0.2em'}}>Title: {this.state.itinerary.title}</h3>
        <h3 style={{color: 'white', fontWeight: 'bold', textShadow: 'black 0.1em 0.1em 0.2em'}}>Country: {this.state.itinerary.country}</h3>
        <h3 style={{color: 'white', fontWeight: 'bold', textShadow: 'black 0.1em 0.1em 0.2em', display: 'inline'}}>Days: {this.state.itinerary.days}</h3>
        <div>
          <Button onClick={() => this.deleteItinerary()} bsStyle='danger' style={{float: 'right', marginRight: '3vh'}}>Delete</Button>
          <Link to={'/edit-blogpage/' + this.state.itinerary_id}><Button bsStyle='info' style={{float: 'right', marginRight: '3vh'}}>Edit this itinerary</Button></Link>
        </div>
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
