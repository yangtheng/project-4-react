import React, {Component} from 'react'
import {Image, Button} from 'react-bootstrap'


class CoverPhoto extends Component {
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
          <Image src='/profilepic.jpg' circle style={{height: '30px', width: '30px', margin: '0 0 10px 10px'}} />
        </div>
        <div style={{margin: '0 0 10px 0', position: 'absolute', right: '0', bottom: '0', whiteSpace: 'nowrap', 'paddingRight': '1%'}}>
          {/* <Button bsStyle='success'>Copy Itinerary</Button> */}
        </div>
      </div>
    )
  }
}

export default CoverPhoto
