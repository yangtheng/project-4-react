import React, {Component} from 'react'
import {Button} from 'react-bootstrap'

class ActivityButton extends Component {
  render () {
    let type = this.props.clicked ? 'success' : 'primary'
    let button = <Button bsStyle={type} style={{
      width: '100%'
    }}>{this.props.title}</Button>

    return (
      <div>
        <a href={'#' + this.props.title}>
          {button}
        </a><br /><br />
      </div>
    )
  }
}

export default ActivityButton
