import React, {Component} from 'react'
import BlogPage from './BlogPage'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import EditBlogPage from './EditBlogPage'
import Nav from './Nav'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    const token = localStorage.getItem('token')
    this.state = {
      token,
      user: null
    }
  }

  render () {
    return (
      <Router>
        <div>
          <Nav token={this.state.token} handleLogout={this.handleLogout} />
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

  handleLogout () {
    localStorage.removeItem('token')
    this.setState({
      token: null
    })
  }
}

export default App
