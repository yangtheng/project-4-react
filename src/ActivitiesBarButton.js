import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import Scroll from 'react-scroll'

var Link = Scroll.Link

class ActivityButton extends Component {
  render () {
    let type = this.props.clicked ? 'success' : 'primary'
    let button = <Button bsStyle={type} style={{
      width: '100%'
    }}>{this.props.title}</Button>

    return (
      <div>
        <Link to={this.props.title} smooth={true} duration={300}>
          {button}
        </Link><br /><br />
      </div>
    )
  }
}

export default ActivityButton
