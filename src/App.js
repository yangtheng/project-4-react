import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import BlogPage from './BlogPage'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Navbar fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to='/'>React-Bootstrap</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem><Link to='/login'>Login</Link></NavItem>
              <NavItem><Link to='/signup'>Signup</Link></NavItem>
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
          </Navbar>
          <div style={{margin: '5% 0 0 0'}}>
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
          </div>
        </div>
      </Router>
    )
  }
}

export default App
