import React, {Component} from 'react'
import {Carousel} from 'react-bootstrap'

class ActivityBody extends Component {
  render () {
    let photos = []
    this.props.photos.forEach(photo => {
      photos.push(
        <Carousel.Item>
          <img key={photo.id} width='100%' style={{margin:'0 auto'}} height='50vh' alt="900x500" src={photo.url} />
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
    return (
      <div id={this.props.activity.id}>
        <Carousel style={{width: '50%', margin:'0 auto'}}>
          {photos}
        </Carousel><br /><br />
        <p style={{textAlign: 'justify'}}>{activityContent}</p>
      </div>
    )
  }
}


export default ActivityBody
