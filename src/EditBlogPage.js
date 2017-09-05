import React, {Component} from 'react'
import CoverPhotoEditPage from './CoverPhotoEditPage'
import {Button, Modal, PanelGroup, Panel, Glyphicon, ButtonToolbar} from 'react-bootstrap'
import './App.css'


import ImageUpload from './ImageUpload'

const url = 'https://project-4-backend.herokuapp.com'

class EditBlogPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: props.token,
      itineraryId: 19,
      itinerary: '',
      day: 1,
      addingActivity: false,
      editingActivity: false,
      activities: [],
      activitiesByDay: [],
      idOfEditedActivity: '',
      newTitle: '',
      newContent: '',
      newLocation: '',
      images: []
    }
  }


  render () {

    let addActivityForm = (
      <Modal show={this.state.addingActivity} onHide={() => this.closeWindow('addActivity')}>
        <Modal.Header>
          <Modal.Title>Add new activity</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label>Title</label>
          <input className='form-control' value={this.state.newTitle} type='text' onChange={(e) => this.handleChange(e, 'newTitle')} />
        </Modal.Body>

        <Modal.Body>
          <label>Location</label>
          <input className='form-control' value={this.state.newLocation} type='text' onChange={(e) => this.handleChange(e, 'newLocation')} />
        </Modal.Body>

        <Modal.Body>
          <label>Content</label>
          <textarea className='form-control' value={this.state.newContent} rows='10' onChange={(e) => this.handleChange(e, 'newContent')} />
        </Modal.Body>

        <Modal.Body>
          <div>
            <ImageUpload images={[]} />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => this.closeWindow('addActivity')}>Cancel</Button>
          <Button bsStyle='primary' onClick={() => this.createActivity()}>Create</Button>
        </Modal.Footer>
      </Modal>
    )

    let editActivityForm = (
      <Modal show={this.state.editingActivity} onHide={() => this.closeWindow('editActivity')}>
        <Modal.Header>
          <Modal.Title>Edit activity</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label>Title</label>
          <input className='form-control' value={this.state.newTitle} type='text' onChange={(e) => this.handleChange(e, 'newTitle')} />
        </Modal.Body>

        <Modal.Body>
          <label>Location</label>
          <input className='form-control' value={this.state.newLocation} type='text' onChange={(e) => this.handleChange(e, 'newLocation')} />
        </Modal.Body>

        <Modal.Body>
          <label>Content</label>
          <textarea className='form-control' value={this.state.newContent} rows='10' onChange={(e) => this.handleChange(e, 'newContent')} />
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle='danger' style={{float: 'left'}} onClick={() => this.saveActivity(this.state.idOfEditedActivity, 'delete')}>Delete activity</Button>
          <Button onClick={() => this.closeWindow('editActivity')}>Cancel</Button>
          <Button bsStyle='primary' onClick={() => this.saveActivity(this.state.idOfEditedActicomponentDidMountvity)}>Save</Button>
        </Modal.Footer>
      </Modal>
    )

    let activities = this.state.activitiesByDay.map((activity, index) => {
      let activityContent
      if (activity.content) {
        activityContent = activity.content.split('\n').map((content, index) => {
          return (
            <span key={index}>
              {content}
              <br />
            </span>
          )
        })
      }
      const header = <div><strong>{activity.blurb}</strong><Glyphicon glyph='triangle-bottom' style={{fontSize: '25px', float: 'right'}} /></div>
      return (
        <Panel style={{margin: '3vh 3vh 0 0'}} bsStyle='info' header={header} key={index} eventKey={index} defaultExpanded>
          <strong>Location: {activity.place}</strong><br /><br />
          {activityContent}<br /><br />
          <Button onClick={() => this.editActivity(activity.id)} bsStyle='primary'>Edit activity</Button>
        </Panel>
      )
    })

    let dayButtons = []

    for (var i = 1; i <= this.state.itinerary.days; i++) {
      let j = i
      dayButtons.push(<span key={j}><Button bsStyle='primary' key={j} style={{width: '100%'}} onClick={() => this.changeDay(j)}>Day {j}</Button><br /><br /></span>)
    }

    return (
      <div>
        <CoverPhotoEditPage title={this.state.itinerary.title} />
        <div>
          <div style={{width: '13vw', margin: '3vh 1%', display: 'inline-block'}}>
            {/* <Button bsStyle='primary' style={{width: '100%'}} onClick={() => this.changeDay(1)}>Day 1</Button><br /><br />
            <Button bsStyle='primary' style={{width: '100%'}} onClick={() => this.changeDay(2)}>Day 2</Button><br /><br />
            <Button bsStyle='primary' style={{width: '100%'}} onClick={() => this.changeDay(3)}>Day 3</Button><br /><br /> */}
            {dayButtons}
          </div>
          <div style={{width: '80vw', padding: '5px', margin: '3vh 0 0 0', display: 'inline-block', float: 'right'}}>
            <div>
              <h3 style={{display: 'inline'}}>Day {this.state.day}</h3>
              <div style={{display: 'inline-block', float: 'right', marginRight: '3vh'}}>
                <ButtonToolbar>
                  <Button bsStyle='primary'>Publish Itinerary</Button>
                  <Button onClick={() => this.openWindow('addActivity')} bsStyle='success'>Add new activity</Button>
                </ButtonToolbar>
              </div>
            </div>
            <PanelGroup accordion>
              {activities}
            </PanelGroup>
            {addActivityForm}
            {editActivityForm}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    fetch(`${url}/profile/${this.state.itineraryId}`,
      {
        method: 'GET',
        headers: {
          "Authorization": 'Bearer ' + this.state.token,
          "Content-Type": 'application/json'
        }
      })
      .then(res => {
        if(res.status === 200) return res.json()
        else throw new Error('Itinerary not found')
      })
      .then(result => {
        console.log(result)
        this.setState({
          itinerary: result.itinerary,
          activities: result.activities,
          activitiesByDay: result.activities.filter(activity => activity.day === this.state.day)
        })
      })
      .catch(error => console.log(error))
  }

  componentWillUpdate () {
    fetch(`${url}/profile/${this.state.itineraryId}`,
      {
        method: 'GET',
        headers: {
          "Authorization": 'Bearer ' + this.state.token,
          "Content-Type": 'application/json'
        }
      })
      .then(res => {
        if(res.status === 200) return res.json()
        else throw new Error('Itinerary not found')
      })
      .then(result => {
        this.setState({
          itinerary: result.itinerary,
          activities: result.activities,
          activitiesByDay: result.activities.filter(activity => activity.day === this.state.day)
        })
      })
      .catch(error => console.log(error))
  }

  changeDay (day) {
    this.setState({
      day,
      activitiesByDay: this.state.activities.filter(activity => activity.day === day)
    })
  }

  handleChange (e, field) {
    this.setState({
      [field]: e.target.value
    })
  }

  editActivity (id) {
    const filteredActivity = this.state.activities.filter(activity => activity.id === id)
    // console.log(filteredActivity)
    this.setState({
      newTitle: filteredActivity[0].blurb,
      newContent: filteredActivity[0].content,
      newLocation: filteredActivity[0].place,
      idOfEditedActivity: id
    })
    this.openWindow('editActivity')
  }

  openWindow (type) {
    const types = {
      addActivity: 'addingActivity',
      editActivity: 'editingActivity'
    }
    const action = types[type]
    this.setState({
      [action]: true
    })
  }

  closeWindow (type) {
    const types = {
      addActivity: 'addingActivity',
      editActivity: 'editingActivity'
    }
    const action = types[type]
    this.setState({
      [action]: false,
      newTitle: '',
      newContent: '',
      newLocation: '',
      idOfEditedActivity: ''
    })
  }

  createActivity () {
    const newActivity = {
      itinerary_id: this.state.itineraryId,
      data: {
        blurb: this.state.newTitle,
        content: this.state.newContent,
        place: this.state.newLocation,
        day: this.state.day,
        // photos: this.state.images
      }
    }

    fetch(`${url}/activity`,
      {
        method: 'POST',
        headers: {
          "Authorization": 'Bearer ' + this.state.token,
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(newActivity)
      })
      .then(res => {
        if (res.status === 201) return res.json()
      })
      .then(result => {
        console.log(result)
      })

    this.setState({
      addingActivity: false,
      newTitle: '',
      newContent: '',
      newLocation: ''
    })
  }

  saveActivity (id, type) {
    if (type === 'delete') {
      const deletedActivity = {
        activity_id: this.state.idOfEditedActivity
      }
      fetch(`${url}/activity`,
        {
          method: 'DELETE',
          headers: {
            "Authorization": 'Bearer ' + this.state.token,
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(deletedActivity)
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) alert('successful!')
        })
    } else {
      const editedActivity = {
        activity_id: this.state.idOfEditedActivity,
        data: {
          blurb: this.state.newTitle,
          content: this.state.newContent,
          place: this.state.newLocation,
          day: this.state.day,
          latitude: '',
          longitude: ''
        }
      }
      fetch(`${url}/activity`,
        {
          method: 'PATCH',
          headers: {
            "Authorization": 'Bearer ' + this.state.token,
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(editedActivity)
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) alert('successful!')
        })
    }
    this.setState({
      editingActivity: false,
      newTitle: '',
      newContent: '',
      newLocation: '',
      idOfEditedActivity: ''
    })
  }
}

export default EditBlogPage
