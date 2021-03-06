import React, {Component} from 'react'
import {Carousel} from 'react-bootstrap'

class ActivityBody extends Component {
  render () {
    let photos = []
    this.props.photos.forEach((photo, index) => {
      photos.push(
        <Carousel.Item key={index}>
          <img width='100%' style={{margin:'0 auto'}} height='50vh' alt="900x500" src={photo.url} />
        </Carousel.Item>
      )
    })
    let activityContent
    if (this.props.activity.content) {
      activityContent = this.props.activity.content.split('\n').map((content, index) => {
        return (
          <span key={index}>
            {content}
            <br />
          </span>
        )
      })
    }
    let carousel
    if (photos.length) {
      carousel = (
        <div>
          <Carousel style={{width: '50%', margin: '0 auto'}}>
            {photos}
          </Carousel><br /><br />
        </div>
      )
    }
    return (
      <div id={this.props.activity.id}>
        {carousel}
        <div style={{maxWidth: '50vw', margin: '0 auto 3vh auto'}}>
          <p style={{textAlign: 'justify'}}>{activityContent}</p>
        </div>
      </div>
    )
  }
}

export default ActivityBody
