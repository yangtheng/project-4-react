import React, {Component} from 'react'
import {Grid, Row} from 'react-bootstrap'
import ItineraryListing from './ItineraryListing'

// const url = 'https://localhost:3001'
const url = 'https://project-4-backend.herokuapp.com'

class HomePage extends Component {
  constructor() {
    super()

    this.state = {
      itineraries: []
    }
  }

  render () {
    var boundRenderAllItineraries = () => this.renderAllItineraries()
    var itineraryList = this.state.itineraries.map((e, index) => {
      return (
        <ItineraryListing renderAllItineraries={boundRenderAllItineraries} itinerary={e} />
      )
    })
    return (
      <Grid>
        <Row>
          <div>
            {itineraryList}
          </div>
        </Row>
      </Grid>
    )
  }

  componentDidMount () {
    fetch(`${url}/`,
      {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json'
        }
      })
      .then(res => {
        console.log('Something')
        if(res.status === 200) return res.json()
        else throw new Error('Itinerary not found')
      })
      .then(result => {
        console.log(result)
        var allItineraries = result.allItineraries
        this.setState({
          itineraries: allItineraries
        })
      })
    .catch(error => console.log(error))
  }
}

export default HomePage
