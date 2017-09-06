import React, {Component} from 'react'
import Masonry from 'react-masonry-component'
import {
  Link
} from 'react-router-dom'

const masonryOptions = {
  itemSelector: '.grid-item',
  columnWidth: 300
}

class Gallery extends Component {
  render() {
    console.log(this.props.images)
    const pics = this.props.images.map((child, i) => {
      var url = 'https://project-4-backend.herokuapp.com/blog/' + child.id
      var id = child.id
      return(
        <Link to={url}><img className='grid-item' src={child.bannerUrl} key={i} /></Link>
      )
    })
    return (
      <Masonry options={masonryOptions}>
        { pics }
      </Masonry>
    );
  }
}

export default Gallery
