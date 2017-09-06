import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'
import superagent from 'superagent'

const backendUrl = 'https://project-4-backend.herokuapp.com'

class ImageUpload extends Component {
  constructor (props) {
    super(props)

    this.state = {
      imagesObjs: props.images,
      images: props.images.map(photo => photo.url)
    }

    this.updateImage = props.updateImage
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
      const uploaded = resp.body

      let updatedImages = Object.assign([], this.state.images)
      updatedImages.push(uploaded.secure_url)

      if (this.props.id) {
        const newPhoto = {
          activity_id: this.props.id,
          data: {
            url: uploaded.secure_url
          }
        }
        fetch(`${backendUrl}/photo`,
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
            return res.json()
          }
          else alert ('There was an error while uploading ' + uploaded.secure_url)
        })
        .then(json => console.log(json))
      }

      this.updateImage(updatedImages)
      this.setState({
        images: updatedImages
      })
    })
  }

  removeImage(event, image) {
    event.preventDefault()
    if(this.props.id) {
      if (!window.confirm('Are you sure?')) return
    }

    let updatedImages = Object.assign([], this.state.images)
    updatedImages.splice(event.target.id, 1)

    if (this.props.id) {
      const photoIndex = this.state.imagesObjs.findIndex(photo => photo.url === image)
      const photoId = this.state.imagesObjs[photoIndex].id
      const deletedPhoto = {
        photo_id: photoId
      }

      fetch(`${backendUrl}/photo`,
        {
          method: 'DELETE',
          headers: {
            "Authorization": 'Bearer ' + this.props.token,
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(deletedPhoto)
        }
      ).then(res => {
        if(res.status === 200) {
          console.log('successfully deleted')
        } else alert ('error deleting')
        return res.json()
      })
      .then(json => console.log(json))
    }

    this.updateImage(updatedImages)
    this.setState({
      images: updatedImages
    })
  }

  render () {
    const list = this.state.images.map((image, i) => {
      return (
        <li key={i}>
          <img style={{width:72}} src={image} />
          <br /><a id={i} onClick={(event) => this.removeImage(event, image)} href='#'>Remove</a>
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
