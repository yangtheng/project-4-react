import React, {Component} from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {
  Link
} from 'react-router-dom'

class Navigation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: props.token
    }

    this.handleLogout = this.props.handleLogout
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      token: nextProps.token
    })
  }

  render () {
    let authLink,
      signupLink
    if (!this.state.token) {
      authLink = <NavItem><Link to='/login'>Login</Link></NavItem>
      signupLink = <NavItem><Link to='/signup'>Signup</Link></NavItem>
    } else if (this.state.token) {
      authLink = <NavItem><a href='#' onClick={() => this.handleLogout()}>Logout</a></NavItem>
    }
    return (
      <Navbar fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>React-Bootstrap</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {authLink}
            {signupLink}
            <NavItem><Link to='/profile'>Profile</Link></NavItem>
            <NavItem><Link to='/blogpage'>Sample Blog</Link></NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.4}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navigation
