import React from 'react'
import CoverPhotoEditPage from './CoverPhotoEditPage'
import ActivityBody from './ActivityBody'
import {Button} from 'react-bootstrap'
import AddActivityForm from './AddActivityForm'

const EditBlogPage = () => (
  <div>
    <CoverPhotoEditPage />
    <div>
      <div style={{width: '13vw', margin: '3vh 1%', display: 'inline-block'}}>
        <Button bsStyle='primary' style={{width: '100%'}}>Day 1</Button><br /><br />
        <Button bsStyle='primary' style={{width: '100%'}}>Day 2</Button><br /><br />
        <Button bsStyle='primary' style={{width: '100%'}}>Day 3</Button><br /><br />
      </div>
      <div style={{width: '80vw', padding: '5px', margin: '3vh 0 0 0', display: 'inline-block', float: 'right'}}>
        This is Activities
        <AddActivityForm />
      </div>
    </div>
  </div>
)

export default EditBlogPage
