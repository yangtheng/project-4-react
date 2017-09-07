import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'
import ImageUpload from './ImageUpload'

class AddItineraryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      token: props.token,
      addingItinerary: false,
      // successfulCreate: false,
      title: '',
      country: '',
      images: []
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
      images: []
    })
  }

  // closeSuccessfulCreate () {
  //   this.setState({
  //     successfulCreate: false
  //   })
  // }

  render () {
    return (
      <div>
        <Button onClick={() => this.openAddItineraryWindow()} bsStyle='success' bsSize='large' block style={{margin: '5vh auto'}}>Add new itinerary</Button>
        {/* <Modal style={{marginTop: '20vh'}} show={this.state.successfulCreate} onHide={() => this.closeSuccessfulCreate()}>
          <Modal.Body>
            <h2>Itinerary successfully created!</h2>
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle='primary' onClick={() => this.closeSuccessfulCreate()}>Ok</Button>
          </Modal.Footer>
        </Modal> */}

        <Modal show={this.state.addingItinerary} onHide={() => this.closeAddItineraryWindow()}>
          <Modal.Header>
            <Modal.Title>Add new itinerary</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <label>Title</label>
            <input className='form-control' type='text' onChange={(e) => this.handleChange(e, 'title')} />
          </Modal.Body>

          <Modal.Body>
            <label>Country</label>
            <input className='form-control' type='text' onChange={(e) => this.handleChange(e, 'country')} />
          </Modal.Body>

          <Modal.Body>
            <label>Banner Photo</label>
            <div>
              <ImageUpload images={[]} updateImage={(updatedImages) => this.updateImage(updatedImages)} />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => this.closeAddItineraryWindow()}>Cancel</Button>
            <Button bsStyle='primary' onClick={() => this.handleSubmit()}>Create</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  updateImage (updatedImages) {
    this.setState({
      images: updatedImages
    })
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
        bannerUrl: this.state.images[0],
        days: 1
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
          // alert('Successfully created!')
          // this.setState({
          //   successfulCreate: true
          // })
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
