import React, {Component} from 'react'
import Masonry from 'react-masonry-component'

const masonryOptions = {
  itemSelector: '.grid-item',
  columnWidth: 300
}

class Gallery extends Component {
  render() {
    console.log(this.props.images)
    const pics = this.props.images.map((child, i) => <img className='grid-item' src={child.bannerUrl} key={i} />)
    return (
      <Masonry options={masonryOptions}>
        { pics }
      </Masonry>
    );
  }
}

export default Gallery
