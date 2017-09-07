import React, {Component} from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button} from 'react-bootstrap'
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
      profileLink = <NavItem><Link to='/profile'>My Bucket</Link></NavItem>
      logoutLink = (
        <Nav>
          <Navbar.Text>
            Signed in as:
          </Navbar.Text>
          <NavDropdown eventKey={3} title={this.props.currentUser || 'Loading...'} id="basic-nav-dropdown">
            <MenuItem eventKey={3.1} href='#' onClick={() => this.handleLogout()}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      )
    }
    return (
      <Navbar fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link style={{margin: '-2vh 0 0 -6vw'}} to='/'><img src='https://image.flaticon.com/icons/svg/63/63998.svg' style={{height: '6vh', width: '6vh', display:'inline'}}/></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {profileLink}
            {/* <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl style={{width:'30vw', marginLeft: '15vw'}} type="text" placeholder="Search Itineraries" />
              </FormGroup>
              {' '}
              <Button>Submit</Button>
            </Navbar.Form> */}
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
