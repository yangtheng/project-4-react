import React, {Component} from 'react'
import CoverPhotoEditPage from './CoverPhotoEditPage'
// import ActivityBody from './ActivityBody'
import {Button, Modal} from 'react-bootstrap'

class EditBlogPage extends Component {
  constructor () {
    super()

    this.state = {
      day: 1,
      addingActivity: false,
      activities: [],
      newTitle: '',
      newContent: ''
    }
  }
  render () {
    let addActivityForm = (
      <Modal show={this.state.addingActivity} onHide={() => this.closeAddActivityWindow()}>
        <Modal.Header>
          <Modal.Title>Add new activity</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label>Title</label>
          <input className='form-control' value={this.state.newTitle} type='text' onChange={(e) => this.handleChange(e, 'newTitle')} />
        </Modal.Body>

        <Modal.Body>
          <label>Title</label>
          <input className='form-control' value={this.state.newLocation} type='text' onChange={(e) => this.handleChange(e, 'newLocation')} />
        </Modal.Body>

        <Modal.Body>
          <label>Content</label>
          <textarea className='form-control' value={this.state.newContent} rows='10' onChange={(e) => this.handleChange(e, 'newContent')} />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => this.closeAddActivityWindow()}>Cancel</Button>
          <Button bsStyle='primary' onClick={() => this.createActivity()}>Create</Button>
        </Modal.Footer>
      </Modal>
    )

    let activities = this.state.activities.map((activity, index) => {
      // let activityContent
      // if (activity.content) {
      //   activityContent = activity.content.split('\n').map((content, index) => {
      //     return (
      //       <span key={index}>
      //         {content}
      //         <br />
      //       </span>
      //     )
      //   })
      // }
      return (
        <div key={index}>
          <h3>{activity.title} @ {activity.location}</h3>
          {/* <p>{activityContent}</p> */}
        </div>
      )
    })
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
              <Button onClick={() => this.openAddActivityWindow()} bsStyle='success' style={{float: 'right', marginRight: '3vh'}}>Add new activity</Button>
            </div>
            {activities}
            {addActivityForm}
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

  handleChange (e, field) {
    this.setState({
      [field]: e.target.value
    })
  }

  openAddActivityWindow () {
    this.setState({
      addingActivity: true
    })
  }

  closeAddActivityWindow () {
    this.setState({
      addingActivity: false,
      newActivity: {
        title: '',
        content: ''
      }
    })
  }

  createActivity () {
    const newActivity = {
      title: this.state.newTitle,
      content: this.state.newContent,
      location: this.state.newLocation
    }
    this.setState({
      addingActivity: false,
      activities: this.state.activities.concat(newActivity),
      newActivity: {
        title: '',
        content: ''
      }
    })
  }
}

export default EditBlogPage
