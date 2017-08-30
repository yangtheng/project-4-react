import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import CoverPhoto from './CoverPhoto'
import ActivitiesBar from './ActivitiesBar'
import ActivityBody from './ActivityBody'
// import logo from './logo.svg';
// import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React-Bootstrap</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider/>
              <MenuItem eventKey={3.4}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <CoverPhoto itinerary=""/>
        <div>
          <ActivitiesBar />
          <div style={{width: '80%', padding: '5px', margin: '5% 5% 0 0', display: 'inline-block', float: 'right'}}>
            <ActivityBody id='breakfast' />
            <ActivityBody id='lunch' />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
