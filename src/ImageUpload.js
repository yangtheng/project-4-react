import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'
import superagent from 'superagent'

class ImageUpload extends Component {
  constructor (props) {
    super(props)

    this.state = {
      images: props.images
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

    return (
      <div>
        <label>Photo</label>
        <Dropzone onDrop={this.uploadFile.bind(this)}/>
        <ol>
          { list }
        </ol>
      </div>
    )
  }
}

export default ImageUpload
