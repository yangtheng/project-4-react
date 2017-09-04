import React, {Component} from 'react'
import CoverPhotoEditPage from './CoverPhotoEditPage'
// import ActivityBody from './ActivityBody'
import {Button, Modal, PanelGroup, Panel, Glyphicon} from 'react-bootstrap'
import './App.css'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'
import superagent from 'superagent'

class EditBlogPage extends Component {

  constructor () {
    super()

    this.state = {
      day: 1,
      addingActivity: false,
      activities: [],
      newTitle: '',
      newContent: '',
      newLocation: '',
      images: []
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
      <Modal show={this.state.addingActivity} onHide={() => this.closeAddActivityWindow()}>
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
          <Button onClick={() => this.closeAddActivityWindow()}>Cancel</Button>
          <Button bsStyle='primary' onClick={() => this.createActivity()}>Create</Button>
        </Modal.Footer>
      </Modal>
    )

    let activities = this.state.activities.map((activity, index) => {
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
      const header = <div><strong>{activity.title} (Location: {activity.location})</strong><Glyphicon glyph='triangle-bottom' style={{fontSize: '25px', float: 'right'}} /></div>
      return (
        <Panel style={{margin: '3vh 3vh 0 0'}} bsStyle='info' header={header} key={index} eventKey={index} defaultExpanded>
          {activityContent}
          <Button bsStyle='primary' style={{marginTop: '1vh'}}>Edit activity</Button>
        </Panel>
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
            <PanelGroup accordion>
              {activities}
            </PanelGroup>
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
      newTitle: '',
      newContent: '',
      newLocation: ''
    })
  }

  createActivity () {
    const newActivity = {
      title: this.state.newTitle,
      content: this.state.newContent,
      location: this.state.newLocation,
      photos: this.state.images
    }
    console.log (newActivity)

    // this.setState({
    //   addingActivity: false,
    //   activities: this.state.activities.concat(newActivity),
    //   newTitle: '',
    //   newContent: '',
    //   newLocation: ''
    // })
  }
}

export default EditBlogPage
