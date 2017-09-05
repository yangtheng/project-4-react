import React from 'react'
import {Image} from 'react-bootstrap'

const url = '/sample.jpg'

const CoverPhoto = () => (
  <div style={ {backgroundImage: 'url(' + url + ')', backgroundSize: 'cover', height: '85vh', position: 'relative', width: '100%', float: 'right'}}>
    <div style={{position: 'absolute', left: '0', bottom: '0', paddingTop: '20vh', background: 'linear-gradient(to bottom, rgba(0,0,0,0), black', width: '100%'}}>
      <h1 style={{margin: '10px 0 0 10px', color: 'white'}}><strong>Bangkok 5D/4N</strong></h1>
      <h3 style={{margin: '10px 0 0 10px', display: 'inline', color: 'white'}}>By: Dom Phua</h3>
      <Image src='profilepic.jpg' circle style={{height: '30px', width: '30px', margin: '0 0 10px 10px'}} />
    </div>
  </div>
)

export default CoverPhoto
