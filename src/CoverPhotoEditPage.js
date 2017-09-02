import React, {Component} from 'react'
import {Glyphicon, Modal, Button} from 'react-bootstrap'
import './App.css'

class CoverPhotoEditPage extends Component {
  constructor () {
    super()

    this.state = {
      title: 'Bangkok 5D/4N',
      newTitle: 'Bangkok 5D/4N',
      editingTitle: false
    }
  }
  render () {
    let editTitleWindow = (
      <Modal show={this.state.editingTitle} onHide={() => this.closeTitleEditWindow()}>
        <Modal.Header>
          <Modal.Title>Edit Title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input className='form-control' value={this.state.newTitle} type='text' onChange={(e) => this.handleTitleChange(e)} />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => this.closeTitleEditWindow()}>Cancel</Button>
          <Button bsStyle='primary' onClick={() => this.saveTitle()}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    )

    return (
      <div style={{backgroundImage: 'url(\'sample.jpg\')', backgroundSize: 'cover', height: '85vh', position: 'relative', width: '100%', float: 'right'}}>
        <div style={{position: 'absolute', left: '0', bottom: '0', paddingTop: '20vh', background: 'linear-gradient(to bottom, rgba(0,0,0,0), black', width: '100%'}}>
          <div onClick={() => this.showTitleEditWindow()} className='coverPhotoDiv' style={{marginBottom: '10px', display: 'inline-block', whiteSpace: 'nowrap', 'paddingRight': '1%'}}>
            <h1 style={{marginLeft: '10px', display: 'inline', color: 'white'}}><strong>{this.state.title}</strong></h1>
            <Glyphicon glyph='pencil' style={{fontSize: '25px', marginLeft: '3%', color: 'white'}} />
          </div>
        </div>
        <div className='coverPhotoDiv' style={{margin: '0 0 10px 0', position: 'absolute', right: '0', bottom: '0', whiteSpace: 'nowrap', 'paddingRight': '1%'}}>
          <h3 style={{display: 'inline', color: 'white'}}>Edit Cover Photo</h3>
          <Glyphicon glyph='picture' style={{fontSize: '18px', marginLeft: '3%', color: 'white'}} />
        </div>
        {editTitleWindow}
      </div>
    )
  }

  handleTitleChange (e) {
    this.setState({
      newTitle: e.target.value
    })
  }

  showTitleEditWindow () {
    this.setState({
      editingTitle: true
    })
  }

  closeTitleEditWindow () {
    this.setState({
      editingTitle: false,
      newTitle: this.state.title
    })
  }

  saveTitle () {
    this.setState({
      editingTitle: false,
      title: this.state.newTitle
    })
  }
}

export default CoverPhotoEditPage
