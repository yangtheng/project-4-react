import React, {Component} from 'react'
import CoverPhotoEditPage from './CoverPhotoEditPage'
// import ActivityBody from './ActivityBody'
import {Button} from 'react-bootstrap'

class EditBlogPage extends Component {
  constructor () {
    super()

    this.state = {
      day: 1
    }
  }
  render () {
    return (
      <div>
        <CoverPhotoEditPage />
        <div>
          <div style={{width: '13vw', margin: '3vh 1%', display: 'inline-block'}}>
            <Button bsStyle='primary' style={{width: '100%'}} onClick={() => this.changeDay(1)}>Day 1</Button><br /><br />
            <Button bsStyle='primary' style={{width: '100%'}} onClick={() => this.changeDay(2)}>Day 2</Button><br /><br />
            <Button bsStyle='primary' style={{width: '100%'}} onClick={() => this.changeDay(3)}>Day 3</Button><br /><br />
          </div>
          <div style={{width: '80vw', padding: '5px', margin: '3vh 0 0 0', display: 'inline-block', float: 'right'}}>
            <div>
              <h3 style={{display: 'inline'}}>Day {this.state.day}</h3>
              <Button bsStyle='success' style={{float: 'right', marginRight: '3vh'}}>Add new activity</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  changeDay (day) {
    this.setState({
      day
    })
  }
}

export default EditBlogPage
