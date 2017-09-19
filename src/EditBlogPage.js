import React, {Component} from 'react'
import CoverPhotoEditPage from './CoverPhotoEditPage'
import {Button, Modal, PanelGroup, Panel, Glyphicon, ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import './App.css'
import Spinner from './Spinner'

import ImageUpload from './ImageUpload'

const url = 'https://project-4-backend.herokuapp.com'

class EditBlogPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      itinerary: '',
      newItineraryDays: '',
      day: 1,
      addingActivity: false,
      editingActivity: false,
      activities: [],
      activitiesByDay: [],
      idOfEditedActivity: '',
      newTitle: '',
      newContent: '',
      newLocation: '',
      newDay: '',
      images: [],
      published: null,
      addingDay: false,
      removingDay: false,
      loading: true
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
            <ImageUpload images={this.state.images} updateImage={(updatedImages) => this.updateImage(updatedImages)} />
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
          <label>Day</label>
          <input className='form-control' value={this.state.newDay} type='number' onChange={(e) => this.handleChange(e, 'newDay')} />
        </Modal.Body>

        <Modal.Body>
          <label>Content</label>
          <textarea className='form-control' value={this.state.newContent} rows='10' onChange={(e) => this.handleChange(e, 'newContent')} />
        </Modal.Body>

        <Modal.Body>
          <div>
            <ImageUpload token={this.props.token} id={this.state.idOfEditedActivity} images={this.state.images || []} updateImage={(updatedImages) => this.updateImage(updatedImages)} />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle='danger' style={{float: 'left'}} onClick={() => this.saveActivity(this.state.idOfEditedActivity, 'delete')}>Delete activity</Button>
          <Button onClick={() => this.closeWindow('editActivity')}>Cancel</Button>
          <Button bsStyle='primary' onClick={() => this.saveActivity(this.state.idOfEditedActivity, 'save')}>Save</Button>
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
      const header = <div><strong>{activity.title}</strong><Glyphicon glyph='triangle-bottom' style={{fontSize: '25px', float: 'right'}} /></div>
      return (
        <PanelGroup key={index} accordion>
          <Panel style={{margin: '3vh 3vh 0 0'}} bsStyle='info' header={header} key={index} eventKey={index}>
            <strong>Location: {activity.place}</strong><br /><br />
            {activityContent}<br /><br />
            <Button onClick={() => this.editActivity(activity.id)} bsStyle='info'>Edit activity</Button>
          </Panel>
        </PanelGroup>
      )
    })

    let dayButtons = []

    for (var i = 1; i <= this.state.newItineraryDays; i++) {
      let j = i
      dayButtons.push(<span key={j}><Button bsStyle='primary' key={j} style={{width: '100%'}} onClick={() => this.changeDay(j)}>Day {j}</Button><br /><br /></span>)
    }

    if (this.state.loading) {
      return (
        <Spinner loading={this.state.loading} />
      )
    } else {
      return (
        <div>
          <CoverPhotoEditPage itinerary={this.state.itinerary} token={this.props.token} getItinerary={() => this.getItinerary()} />
          <div>
            <div style={{width: '13vw', margin: '3vh 1%', display: 'inline-block'}}>
              {dayButtons}
              <ButtonToolbar>
                <Button bsStyle='success' disabled={this.state.addingDay} style={{width: '70%', minWidth: '120px', marginBottom: '1vh'}} onClick={() => this.editDays('add')}><Glyphicon style={{float: 'left', fontSize: '20px', display: this.state.addingDay ? 'none' : ''}} glyph='plus' />{this.state.addingDay ? 'Adding Day...' : 'New Day'}</Button>
                <Button bsStyle='danger' disabled={this.state.removingDay} style={{width: '70%', minWidth: '120px'}} onClick={() => this.editDays('remove')}><Glyphicon style={{float: 'left', fontSize: '20px', margin: '0 2% 0 -2%', display: this.state.removingDay ? 'none' : ''}} glyph='minus' />{this.state.removingDay ? 'Removing Day...' : 'Remove Day'}</Button>
              </ButtonToolbar>
            </div>
            <div style={{width: '80vw', padding: '5px', margin: '3vh 0 0 0', display: 'inline-block', float: 'right', minHeight: '90vh'}}>
              <div>
                <h3 style={{display: 'inline'}}>Day {this.state.day}</h3>
                <div style={{display: 'inline-block', float: 'right', marginRight: '3vh'}}>
                  <ButtonToolbar>

                    <ToggleButtonGroup type="radio" name="options" value={this.state.published}>
                      <ToggleButton value={false} onClick={()=> this.unpublish()}>
                        Private
                      </ToggleButton>
                      <ToggleButton value={true} onClick={()=> this.publish()}>Published</ToggleButton>
                    </ToggleButtonGroup>

                    <Button onClick={() => this.openWindow('addActivity')} bsStyle='success'>Add new activity</Button>
                  </ButtonToolbar>
                </div>
              </div>
              {activities}
              {addActivityForm}
              {editActivityForm}
            </div>
          </div>
        </div>
      )
    }
  }

  updateImage (updatedImages) {
    this.setState({
      images: updatedImages
    })
  }

  componentDidMount () {
    this.getItinerary()
    window.scrollTo(0, 0)
  }

  getItinerary () {
    fetch(`${url}/profile/${this.props.id}`,
      {
        method: 'GET',
        headers: {
          "Authorization": 'Bearer ' + this.props.token,
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
          activities: result.activities.sort((a, b) => a.created_at > b.created_at),
          activitiesByDay: result.activities.filter(activity => activity.day === this.state.day),
          published: result.itinerary.published,
          oldImages: result.photos,
          loading: false,
          newItineraryDays: result.itinerary.days,
          addingDay: false,
          removingDay: false
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
    const photos =  this.state.oldImages[this.state.oldImages.findIndex(photo => {
      if (photo[0]) {
        return photo[0].activity_id === id
      } else return false
    })]

    this.setState({
      newTitle: filteredActivity[0].title,
      newContent: filteredActivity[0].content,
      newLocation: filteredActivity[0].place,
      newDay: filteredActivity[0].day,
      images: photos,
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
      images: [],
      idOfEditedActivity: ''
    })
    this.getItinerary()
  }

  editDays (action) {
    let newItinerary = this.state.itinerary
    const actions = {
      add: [newItinerary.days + 1, 'addingDay'],
      remove: [newItinerary.days - 1, 'removingDay']
    }
    const typeOfAction = actions[action][1]
    newItinerary.days = actions[action][0]
    newItinerary = {
      data: newItinerary
    }
    this.setState({
      [typeOfAction]: true
    })
    fetch(`${url}/profile/${this.props.id}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + this.props.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItinerary)
      }
    )
      .then(res => {
        if (res.status === 200) {
          this.getItinerary()
        }
        else console.log(res)
      })
  }

  createActivity () {
    const newActivity = {
      itinerary_id: this.props.id,
      data: {
        title: this.state.newTitle,
        content: this.state.newContent,
        place: this.state.newLocation,
        day: this.state.day
      }
    }

    fetch(`${url}/activity`,
      {
        method: 'POST',
        headers: {
          "Authorization": 'Bearer ' + this.props.token,
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(newActivity)
      })
      .then(res => {
        if (res.status === 200) {
          this.getItinerary()
          return res.json()
        }
      })
      .then(result => {
        this.state.images.forEach(photo => {
          const newPhoto = {
            activity_id: result.createdActivity.id,
            data: {
              url: photo
            }
          }
          fetch(`${url}/photo`,
            {
              method: 'POST',
              headers: {
                "Authorization": 'Bearer ' + this.props.token,
                "Content-Type": 'application/json'
              },
              body: JSON.stringify(newPhoto)
            }
          ).then(res => {
            console.log(res);
            if (res.status === 200) {
              this.getItinerary()
              this.setState({
                images: []
              })
              return res.json()
            }
            else alert ('There was an error while uploading ' + photo)
          })
          .then(json => console.log(json))
        })
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
            "Authorization": 'Bearer ' + this.props.token,
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(deletedActivity)
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) alert('successful!')
          this.getItinerary()
        })
    } else {
      const editedActivity = {
        activity_id: this.state.idOfEditedActivity,
        data: {
          title: this.state.newTitle,
          content: this.state.newContent,
          place: this.state.newLocation,
          day: this.state.newDay,
          latitude: '',
          longitude: ''
        }
      }
      fetch(`${url}/activity`,
        {
          method: 'PATCH',
          headers: {
            "Authorization": 'Bearer ' + this.props.token,
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(editedActivity)
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) alert('successful!')
          this.getItinerary()
        })
    }
    this.setState({
      editingActivity: false,
      newTitle: '',
      newContent: '',
      newLocation: '',
      newDay: '',
      idOfEditedActivity: ''
    })
  }

  publish (e) {
    this.setState({published: true})
    // console.log('after toggle', this.state.published)

    let newItinerary = this.state.itinerary
    newItinerary.published = this.state.published
    newItinerary = {
      data: newItinerary
    }

    fetch(`${url}/profile/${this.props.id}`,
      {
        method: 'PATCH',
        headers: {
          "Authorization": 'Bearer ' + this.props.token,
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(newItinerary)
      })
      .then(res => {
        if(res.status === 200) return res.json()
        else throw new Error('Itinerary not found')
      })
      .then(result => {
        console.log(result)
      })
      .catch(error => console.log(error))
  }

  unpublish (e) {
    this.setState({published: false})
    // console.log('after toggle', this.state.published)

    let newItinerary = this.state.itinerary
    newItinerary.published = this.state.published
    newItinerary = {
      data: newItinerary
    }

    fetch(`${url}/profile/${this.props.id}`,
      {
        method: 'PATCH',
        headers: {
          "Authorization": 'Bearer ' + this.props.token,
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(newItinerary)
      })
      .then(res => {
        if(res.status === 200) return res.json()
        else throw new Error('Itinerary not found')
      })
      .then(result => {
        console.log(result)
      })
      .catch(error => console.log(error))
  }
}

export default EditBlogPage
