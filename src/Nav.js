import React, {Component} from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {
  Link
} from 'react-router-dom'

class Navigation extends Component {
  constructor (props) {
    super(props)

    this.handleLogout = this.props.handleLogout
  }

  render () {
    let loginLink,
      signupLink,
      logoutLink,
      profileLink
    if (!this.props.token) {
      loginLink = <NavItem><Link to='/login'>Login</Link></NavItem>
      signupLink = <NavItem><Link to='/signup'>Signup</Link></NavItem>
    } else if (this.props.token) {
      profileLink = <NavItem><Link to='/profile'>Profile</Link></NavItem>
      logoutLink = (
        <NavDropdown eventKey={3} title={this.props.currentUser || 'Loading...'} id="basic-nav-dropdown">
          <MenuItem eventKey={3.1} href='#' onClick={() => this.handleLogout()}>Logout</MenuItem>
        </NavDropdown>
      )
    }
    return (
      <Navbar fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Barket List</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {profileLink}
          </Nav>
          <Nav pullRight>
            {loginLink}
            {logoutLink}
            {signupLink}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navigation
