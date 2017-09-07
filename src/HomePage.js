import React, {Component} from 'react'
import {Grid, Row} from 'react-bootstrap'
import ItineraryListing from './ItineraryListing'
import Spinner from './Spinner'

// const url = 'https://localhost:3001'
const url = 'https://project-4-backend.herokuapp.com'

class HomePage extends Component {
  constructor() {
    super()

    this.state = {
      itineraries: [],
      users: [],
      loading: true
    }
  }

  render () {
    const itineraryList = this.state.itineraries.map((e, index) => {
      return (
        <ItineraryListing key={e.id} author={this.state.users[index]} renderAllItineraries={boundRenderAllItineraries} itinerary={e} />
      )
    })
    if (this.state.loading) {
      return (
        <Spinner loading={this.state.loading} />
      )
    } else {
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
        if(res.status === 200) return res.json()
        else throw new Error('Itinerary not found')
      })
      .then(result => {
        const allItineraries = result.allItineraries
        this.setState({
          itineraries: allItineraries,
          users: result.owners,
          loading: false
        })
      })
    .catch(error => console.log(error))
  }
}

export default HomePage
