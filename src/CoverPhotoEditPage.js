import React from 'react'
import {Glyphicon} from 'react-bootstrap'

const CoverPhotoEditPage = () => (
  <div style={{backgroundImage: 'url(\'sample.jpg\')', backgroundSize: 'cover', height: '85vh', position: 'relative', width: '100%', float: 'right'}}>
    <div style={{position: 'absolute', left: '0', bottom: '0', paddingTop: '20vh', background: 'linear-gradient(to bottom, rgba(0,0,0,0), black', width: '100%'}}>
      <div style={{marginBottom: '10px'}}>
        <h1 style={{marginLeft: '10px', display: 'inline', color: 'white'}}><strong>Bangkok 5D/4N</strong></h1>
        <Glyphicon glyph='pencil' style={{fontSize: '25px', marginLeft: '1%', color: 'white'}} />
      </div>
    </div>
    <div style={{margin: '0 20px 10px 0', position: 'absolute', right: '0', bottom: '0', whiteSpace: 'nowrap'}}>
      <h3 style={{display: 'inline', color: 'white'}}>Edit Cover Photo</h3>
      <Glyphicon glyph='picture' style={{fontSize: '18px', marginLeft: '3%', color: 'white'}} />
    </div>
  </div>
)

export default CoverPhotoEditPage
