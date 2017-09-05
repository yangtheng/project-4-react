import React, {Component} from 'react'
import CoverPhotoEditPage from './CoverPhotoEditPage'
import {Button, Modal, PanelGroup, Panel, Glyphicon, ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import './App.css'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'
import superagent from 'superagent'

const url = 'https://project-4-backend.herokuapp.com'

class EditBlogPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: props.token,
      itineraryId: props.id,
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
      newDay: '',
      images: [],
      published: null,
      addingDay: false,
      removingDay: false
    }
  }

  uploadFile (files) {
    console.log('uploadFile: ')
    const image = files[0]

    const cloudName = 'dominikphua'

    const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload'

    const timestamp = Date.now()/1000

    const uploadPreset = 'sqspzusi'

    const paramsStr = 'timestamp=' + timestamp + '&upload_preset=' + uploadPreset + 'weRc9kcELrJBhBeqL0Zi6OQhVew'

    const signature = sha1(paramsStr)
    const params = {
      'api_key': '881529489275562',
      'timestamp': timestamp,
      'upload_preset': uploadPreset,
      'signature': signature
    }

    let uploadRequest = superagent.post(url)
    uploadRequest.attach('file', image)

    Object.keys(params).forEach((key) => {
      uploadRequest.field(key, params[key])
    })

    uploadRequest.end((err,resp) => {
      if (err) {
        alert(err)
        return
      }
      console.log('UPLOAD COMPLETE: ' + JSON.stringify(resp.body))
      const uploaded = resp.body

      let updatedImages = Object.assign([], this.state.images)
      updatedImages.push(uploaded.secure_url)

      this.setState({
        images: updatedImages
      })
    })
  }

  removeImage(event) {
    event.preventDefault()
    console.log('removeImage: '+ event.target.id)

    let updatedImages = Object.assign([], this.state.images)
    updatedImages.splice(event.target.id, 1)

    this.setState({
      images: updatedImages
    })
  }

  render () {
    const list = this.state.images.map((image, i) => {
      return (
        <li key={i}>
          <img style={{width:72}} src={image} />
          <br /><a id={i} onClick={this.removeImage.bind(this)} href='#'>Remove</a>
        </li>
      )
    })

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
          <label>Photo</label>
          <Dropzone onDrop={this.uploadFile.bind(this)}/>
          <ol>
            { list }
          </ol>
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

        <Modal.Footer>
          <Button bsStyle='danger' style={{float: 'left'}} onClick={() => this.saveActivity(this.state.idOfEditedActivity, 'delete')}>Delete activity</Button>
          <Button onClick={() => this.closeWindow('editActivity')}>Cancel</Button>
          <Button bsStyle='primary' onClick={() => this.saveActivity(this.state.idOfEditedActivity)}>Save</Button>
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
        <Panel style={{margin: '3vh 3vh 0 0'}} bsStyle='info' header={header} key={index} eventKey={index} defaultExpanded>
          <strong>Location: {activity.place}</strong><br /><br />
          {activityContent}<br /><br />
          <Button onClick={() => this.editActivity(activity.id)} bsStyle='info'>Edit activity</Button>
        </Panel>
      )
    })

    let dayButtons = []

    for (var i = 1; i <= this.state.itinerary.days; i++) {
      let j = i
      dayButtons.push(<span key={j}><Button bsStyle='primary' key={j} style={{width: '100%'}} onClick={() => this.changeDay(j)}>Day {j}</Button><br /><br /></span>)
    }

    // let addDayBtn,
    //   removeDayBtn
    // if (this.state.addingDay) addDayBtn = (<Button bsStyle='success' style={{width: '70%', marginBottom: '1vh'}} onClick={() => this.editDays('add')}><i className='fa fa-circle-o-notch fa-spin'>Adding Day</i></Button>)
    // else addDayBtn = ()

    return (
      <div>
        <CoverPhotoEditPage itinerary={this.state.itinerary} token={this.state.token} getItinerary={() => this.getItinerary()} />
        <div>
          <div style={{width: '13vw', margin: '3vh 1%', display: 'inline-block'}}>
            {dayButtons}
            <ButtonToolbar>
              <Button bsStyle='success' style={{width: '70%', minWidth: '120px', marginBottom: '1vh'}} onClick={() => this.editDays('add')}><Glyphicon style={{float: 'left', fontSize: '20px'}} glyph='plus' />New Day</Button>
              <Button bsStyle='danger' style={{width: '70%', minWidth: '120px'}} onClick={() => this.editDays('remove')}><Glyphicon style={{float: 'left', fontSize: '20px', margin: '0 2% 0 -2%'}} glyph='minus' />Remove Day</Button>
            </ButtonToolbar>
          </div>
          <div style={{width: '80vw', padding: '5px', margin: '3vh 0 0 0', display: 'inline-block', float: 'right', minHeight: '90vh'}}>
            <div>
              <h3 style={{display: 'inline'}}>Day {this.state.day}</h3>
              <div style={{display: 'inline-block', float: 'right', marginRight: '3vh'}}>
                <ButtonToolbar>

                  <ToggleButtonGroup type="radio" name="options" defaultValue={this.state.published}>
                    <ToggleButton value={false} onClick={()=> this.unpublish()}>
                      Private
                    </ToggleButton>
                    <ToggleButton value={true} onClick={()=> this.publish()}>Published</ToggleButton>
                  </ToggleButtonGroup>

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
    this.getItinerary()
  }

  getItinerary () {
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
          activitiesByDay: result.activities.filter(activity => activity.day === this.state.day),
          published: result.itinerary.published
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
      newTitle: filteredActivity[0].title,
      newContent: filteredActivity[0].content,
      newLocation: filteredActivity[0].place,
      newDay: filteredActivity[0].day,
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
  }

  editDays (action) {
    const currentDays = this.state.itinerary.days
    const actions = {
      add: currentDays + 1,
      remove: currentDays - 1
    }
    let newItinerary = this.state.itinerary
    newItinerary.days = actions[action]
    newItinerary = {
      data: newItinerary
    }
    fetch(`${url}/profile/${this.state.itineraryId}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItinerary)
      }
    )
      .then(res => {
        if (res.status === 200) {
          this.getItinerary()
          this.setState({
            addingDay: false
          })
        }
        else console.log(res)
      })
  }

  createActivity () {
    const newActivity = {
      itinerary_id: this.state.itineraryId,
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
          "Authorization": 'Bearer ' + this.state.token,
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
                "Authorization": 'Bearer ' + this.state.token,
                "Content-Type": 'application/json'
              },
              body: JSON.stringify(newPhoto)
            }
          ).then(res => {
            if (res.status === 200) this.getItinerary()
            else alert ('There was an error while uploading ' + photo)
          })
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
            "Authorization": 'Bearer ' + this.state.token,
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
            "Authorization": 'Bearer ' + this.state.token,
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
      images: [],
      idOfEditedActivity: ''
    })
  }

  publish (e) {
    this.setState({published: true})
    console.log('after toggle', this.state.published)

    let newItinerary = this.state.itinerary
    newItinerary.published = this.state.published
    newItinerary = {
      data: newItinerary
    }

    fetch(`${url}/profile/${this.state.itineraryId}`,
      {
        method: 'PATCH',
        headers: {
          "Authorization": 'Bearer ' + this.state.token,
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
    console.log('after toggle', this.state.published)

    let newItinerary = this.state.itinerary
    newItinerary.published = this.state.published
    newItinerary = {
      data: newItinerary
    }

    fetch(`${url}/profile/${this.state.itineraryId}`,
      {
        method: 'PATCH',
        headers: {
          "Authorization": 'Bearer ' + this.state.token,
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
