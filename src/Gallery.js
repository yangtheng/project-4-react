import React, {Component} from 'react'
import Masonry from 'react-masonry-component'
import {
  Link
} from 'react-router-dom'

import {Thumbnail} from 'react-bootstrap'

const masonryOptions = {
  itemSelector: '.grid-item',
  columnWidth: 300
}

class Gallery extends Component {
  render() {
    console.log(this.props.images)

    const pics = this.props.images.map((child, i) => {
      var url = '/blog/' + child.id
      var resize = child.bannerUrl.split('/')
      var starting = 'https://res.cloudinary.com/dominikphua/image/upload'
      var edit = 'w_600,c_limit'
      var editUrl = starting + '/' + edit + '/' + resize[6] + '/' + resize[7]
      var id = child.id
      return(
        <Thumbnail src={editUrl} alt={{width: '100%'}} />
        // <Link to={url}>
        //   <img className='grid-item' src={editUrl} key={i} />
        // </Link>
      )
    })

    return (
      <Masonry options={masonryOptions}>
        { pics }
      </Masonry>
    )

  }
}

export default Gallery
