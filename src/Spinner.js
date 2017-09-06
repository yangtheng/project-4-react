import React, {Component} from 'react'
import { MoonLoader } from 'react-spinners'
import './loading.css'

class Spinner extends Component {
  render () {
    return (
      <div className='loading'>
        <MoonLoader className='sweet-loading'
          color={'#123abc'}
          loading={this.props.loading}
        />
      </div>
    )
  }
}

export default Spinner
