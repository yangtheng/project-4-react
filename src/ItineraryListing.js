import React, {Component} from 'react'
import {Thumbnail, Col, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './App.css'

class ItineraryListing extends Component {
  constructor (props) {
    super (props)
    this.state = {
      itinerary_id: props.itinerary.id,
      itinerary: props.itinerary,
      author: props.author
    }
  }

  render () {
    var url = '/blog/' + this.state.itinerary.id
    if(this.state.itinerary.bannerUrl) {
      var resize = this.state.itinerary.bannerUrl.split('/')
      var starting = 'https://res.cloudinary.com/dominikphua/image/upload'
      var edit = 'w_600,h_400,c_crop'
      var editUrl = starting + '/' + edit + '/' + resize[6] + '/' + resize[7]
    }
    return (
      <Col key={this.props.itinerary.id} xs={6} md={4}>
        <Link to={url}>
          <Thumbnail src={editUrl || 'https://erconsult.com.au/wp-content/uploads/2015/04/placeholder-600x400.png'} style={{height: '360px'}} alt="242x200">
          <h4>{this.state.itinerary.title}</h4>
          <h5>{this.state.itinerary.country}</h5>
          <h5>Author: {this.state.author.name}</h5>
          <p>
          </p>
        </Thumbnail>
      </Link>
      </Col>
    )
  }
}

export default ItineraryListing
