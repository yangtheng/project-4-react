import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import BlogPage from './BlogPage'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import EditBlogPage from './EditBlogPage'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      token: props.token,
      loggedIn: !!props.token
    }
  }
  render () {
    let authLink
    if (!this.state.loggedIn) {
      authLink = <Link to='/login'>Login</Link>
    } else {
      authLink = <a href='#' onClick={() => this.handleLogout()}>Logout</a>
    }
    return (
      <Router>
        <div>
          <Navbar fixedTop collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to='/'>React-Bootstrap</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem>{authLink}</NavItem>
                <NavItem><Link to='/signup'>Signup</Link></NavItem>
                <NavItem><Link to='/profile'>Profile</Link></NavItem>
                <NavItem><Link to='/blogpage'>Sample Blog</Link></NavItem>
                <NavItem><Link to='/edit-blogpage'>Sample Edit Blog Page</Link></NavItem>
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
          <div style={{margin: '10vh 0 0 0'}}>
            <Route path='/login' component={
              () => (
                <Login />
              )
            } />
            <Route path='/signup' component={
              () => (
                <Signup />
              )
            } />
            <Route path='/blogpage' component={
              () => (
                <BlogPage />
              )
            } />
            <Route path='/profile' component={
              () => (
                <Profile />
              )
            } />
            <Route path='/edit-blogpage' component={
              () => (
                <EditBlogPage />
              )
            } />
          </div>
        </div>
      </Router>
    )
  }

  handleLogout() {
    this.setState({
      token: null,
      loggedIn: false
    })
  }
}

export default App
