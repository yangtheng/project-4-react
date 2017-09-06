import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'

class AddItineraryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      token: props.token,
      addingItinerary: false,
      title: '',
      country: '',
      bannerUrl: ''
    }

    this.renderAllItineraries = this.props.renderAllItineraries
  }

  openAddItineraryWindow () {
    this.setState({
      addingItinerary: true
    })
  }

  closeAddItineraryWindow () {
    this.setState({
      addingItinerary: false,
      title: '',
      country: '',
      bannerUrl: ''
    })
  }


  render () {
    return (
      <div>
        <Button onClick={() => this.openAddItineraryWindow()} bsStyle='success' bsSize='large' block style={{margin: '5vh auto'}}>Add new itinerary</Button>

        <Modal show={this.state.addingItinerary} onHide={() => this.closeAddItineraryWindow()}>
          <Modal.Header>
            <Modal.Title>Add new itinerary</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <label>Title</label>
            <input className='form-control' value={this.state.title} type='text' onChange={(e) => this.handleChange(e, 'title')} />
          </Modal.Body>

          <Modal.Body>
            <label>Country</label>
            <input className='form-control' value={this.state.country} type='text' onChange={(e) => this.handleChange(e, 'country')} />
          </Modal.Body>

          <Modal.Body>
            <label>Banner URL</label>
            <input type="text" className='form-control' value={this.state.bannerUrl} onChange={(e) => this.handleChange(e, 'bannerUrl')} />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => this.closeAddItineraryWindow()}>Cancel</Button>
            <Button bsStyle='primary' onClick={() => this.handleSubmit()}>Create</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  handleChange (e, field) {
    this.setState({
      [field]: e.target.value
    })
  }

  handleSubmit (e) {
    const params = {
      data: {
        title: this.state.title,
        country: this.state.country,
        bannerUrl: this.state.bannerUrl
      }
    }

    fetch('https://project-4-backend.herokuapp.com/profile',
      {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          "Authorization": "Bearer " + this.state.token
        },
        body: JSON.stringify(params)
      })
      .then(res => {
        if (res.status === 200) {
          alert('Successfully created!')
          this.renderAllItineraries()
        }
        return res.json()
      })
      .then(result => console.log(result))
      .catch(err => console.log('there is an an error: ', err))

    this.setState({addingItinerary: false})
  }

}

export default AddItineraryForm
