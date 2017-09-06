import React, {Component} from 'react'
import {Image} from 'react-bootstrap'

const url = '/sample.jpg'

class CoverPhoto extends Component {
  constructor(props) {
    super(props)

    this.state = {
      itinerary: props.itinerary,
      author: props.author
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     itinerary: nextProps.itinerary,
  //     author: nextProps.author
  //   })
  // }

  render () {
    return (
      <div style={ {backgroundImage: 'url(' + this.props.itinerary.bannerUrl + ')', backgroundSize: 'cover', height: '85vh', position: 'relative', width: '100%', float: 'right'}}>
        <div style={{position: 'absolute', left: '0', bottom: '0', paddingTop: '20vh', background: 'linear-gradient(to bottom, rgba(0,0,0,0), black', width: '100%'}}>
          <h1 style={{margin: '10px 0 0 10px', color: 'white'}}><strong>{this.props.itinerary.title}</strong></h1>
          <h3 style={{margin: '10px 0 0 10px', display: 'inline', color: 'white'}}>By: {this.props.author}</h3>
          <Image src='profilepic.jpg' circle style={{height: '30px', width: '30px', margin: '0 0 10px 10px'}} />
        </div>
      </div>
    )
  }
}

export default CoverPhoto
