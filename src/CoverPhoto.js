import React from 'react'
import {Image} from 'react-bootstrap'

const CoverPhoto = () => (
  <div style={{backgroundImage: 'url(\'sample.jpg\')', backgroundSize: 'cover', height: '400px', position: 'relative', width: '80%', float: 'right', marginRight: '5%'}}>
    <div style={{position: 'absolute', left: '0', bottom: '0', backgroundColor: 'rgba(255,255,255,0.5)', width: '100%'}}>
      <h1 style={{margin: '10px 0 0 10px'}}><strong>Bangkok 5D/4N</strong></h1>
      <h3 style={{margin: '10px 0 0 10px', display: 'inline'}}>By: Dom Phua</h3>
      <Image src='profilepic.jpg' circle style={{height: '30px', width: '30px', margin: '0 0 10px 10px'}} />
    </div>
  </div>
)

export default CoverPhoto
