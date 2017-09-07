import React, {Component} from 'react'
import {Button, Popover, OverlayTrigger} from 'react-bootstrap'
import Scroll from 'react-scroll'

const Link = Scroll.Link

class ActivityButton extends Component {
  render () {
    let opacity = this.props.clicked ? '1' : '0.5'
    let button = (
      <Button bsSize='large' bsStyle='primary' style={{
        width: '100%',
        opacity
      }}><span style={{fontSize: '12pt'}}>{this.props.title}</span></Button>
    )
    let popover = (
      <Popover id="popover-trigger-hover-focus">
        Location: {this.props.place}
      </Popover>
    )

    return (
      <div>
        <Link to={this.props.id} smooth={true} duration={300} offset={-70}>
          <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popover}>
          {button}
          </OverlayTrigger>
        </Link><br /><br />
      </div>
    )
  }
}

export default ActivityButton
