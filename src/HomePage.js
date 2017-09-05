import React, {Component} from 'react'
import Gallery from './Gallery'

// const url = 'https://localhost:3001'
const url = 'https://project-4-backend.herokuapp.com'

class HomePage extends Component {
  constructor() {
    super()

    this.state = {
      images: []
    }
  }

  render () {
    console.log(this.state.images)
    return (
      <div>
        <Gallery images={this.state.images} />
      </div>
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
        if(res.status === 200) return res.json()
        else throw new Error('Itinerary not found')
      })
      .then(result => {
        var imgArr = result.allItineraries.map((e) => {
          return e
        })
        this.setState({
          images: imgArr
      })
      console.log('Homepage', this.state.images)
    })
    .catch(error => console.log(error))
  }
}

export default HomePage
