import React, {Component} from 'react'
import {Image, Button, Glyphicon, Modal} from 'react-bootstrap'
import {
  Link
} from 'react-router-dom'


class CoverPhoto extends Component {
  constructor (props) {
    super(props)

    this.state = {
      copyingItinerary: false,
      successfullyCopied: false,
      newItineraryId: ''
    }
  }

  copyItinerary () {
    this.setState({
      copyingItinerary: true
    })
    const copiedItinerary = {
      data: {
        title: this.props.itinerary.title,
        country: this.props.itinerary.country,
        days: this.props.itinerary.days,
        bannerUrl: ''
      }
    }
    fetch('https://project-4-backend.herokuapp.com/profile',
      {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          "Authorization": "Bearer " + this.props.token
        },
        body: JSON.stringify(copiedItinerary)
      })
      .then(res => {
        if (res.status === 200) {
          // alert('Successfully created!')
          return res.json()
        }
      })
      .then(result => {
        console.log(result);
        const newItineraryId = result.createdItinerary.id
        this.props.activities.forEach((activity, index) => {
          const newActivity = {
            itinerary_id: newItineraryId,
            data: {
              title: activity.title,
              content: '',
              place: activity.place,
              day: activity.day
            }
          }

          fetch('https://project-4-backend.herokuapp.com/activity',
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
                if (index === this.props.activities.length - 1) {
                  this.setState({
                    copyingItinerary: false,
                    successfullyCopied: true,
                    newItineraryId
                  })
                  // alert('Successfully copied!')
                }
                return res.json()
              }
            })
        })
      })
      .catch(err => console.log('there is an an error: ', err))
  }

  // closeSuccessfullyCopied () {
  //   this.setState({
  //     successfullyCopied: false,
  //     newItineraryId: ''
  //   })
  // }

  render () {
    let copyItineraryBtn, successfulCopyAlert
    if (this.props.token && this.props.currentUser !== this.props.author) {
      copyItineraryBtn = (
        <Button onClick={() => this.copyItinerary()} disabled={this.state.copyingItinerary} bsStyle='success' bsSize='large'><strong style={{fontSize: '18pt'}}>{this.state.copyingItinerary ? 'Copying Itinerary...' : 'Copy Itinerary'}</strong><Glyphicon glyph='duplicate' style={{fontSize: '18pt', marginLeft: '3%', color: 'white', display: this.state.copyingItinerary ? 'none' : '' }} /></Button>
      )
    }
    if(this.state.successfullyCopied) {
      successfulCopyAlert = (
        <div className='alert alert-success' role='alert'>
          <strong>Itinerary successfully copied!!</strong> Click <Link className='alert-link' to={'/edit-blogpage/' + this.state.newItineraryId}>here</Link> to view the copied Itinerary!
        </div>
      )
    }
    return (
      <div>
        {/* <Modal style={{marginTop: '20vh'}} show={this.state.successfullyCopied} onHide={() => this.closeSuccessfullyCopied()}>
          <Modal.Body>
            <h2>Itinerary successfully copied! Click <Link to={'/edit-blogpage/' + this.state.newItineraryId}>here</Link> to view the copied Itinerary!</h2>
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle='primary' onClick={() => this.closeSuccessfullyCopied()}>Close</Button>
          </Modal.Footer>
        </Modal> */}
        <div style={ {backgroundImage: 'url(' + this.props.itinerary.bannerUrl + ')', backgroundSize: 'cover', height: '85vh', position: 'relative', width: '100%', float: 'right'}}>
          {successfulCopyAlert}
          <div style={{position: 'absolute', left: '0', bottom: '0', paddingTop: '20vh', background: 'linear-gradient(to bottom, rgba(0,0,0,0), black', width: '100%'}}>
            <h1 style={{margin: '10px 0 0 10px', color: 'white'}}><strong>{this.props.itinerary.title}</strong></h1>
            <h3 style={{margin: '10px 0 0 10px', display: 'inline', color: 'white'}}>By: {this.props.author}</h3>
            {/* <Image src='/profilepic.jpg' circle style={{height: '30px', width: '30px', margin: '0 0 10px 10px'}} /> */}
          </div>
          <div style={{margin: '0 0 10px 0', position: 'absolute', right: '0', bottom: '0', whiteSpace: 'nowrap', 'paddingRight': '1%'}}>
            {copyItineraryBtn}
          </div>
        </div>
      </div>
    )
  }
}

export default CoverPhoto
