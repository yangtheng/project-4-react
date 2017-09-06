import React, {Component} from 'react'
import {Thumbnail, Col, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class ItineraryListing extends Component {
  constructor (props) {
    super (props)
    this.state = {
      itinerary_id: props.itinerary.id,
      itinerary: props.itinerary
    }
  }

  render () {
    var url = '/blog/' + this.state.itinerary.id
    var resize = this.state.itinerary.bannerUrl.split('/')
    var starting = 'https://res.cloudinary.com/dominikphua/image/upload'
    var edit = 'w_400,h_600,c_crop'
    var editUrl = starting + '/' + edit + '/' + resize[6] + '/' + resize[7]
    return (
      <Col xs={6} md={4}>
        <Thumbnail src={editUrl} style={{height: '100%', width: '100%'}} alt="242x200">
          <h3>{this.state.itinerary.title}</h3>
          <h4>{this.state.itinerary.country}</h4>
          <p>
            <Link to={url}>
              <Button bsStyle="primary">View</Button>
            </Link>
          </p>
        </Thumbnail>
      </Col>
    )
  }
}

export default ItineraryListing
