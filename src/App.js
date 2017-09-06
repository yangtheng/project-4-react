import React, {Component} from 'react'
import BlogPage from './BlogPage'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import EditBlogPage from './EditBlogPage'
import Nav from './Nav'
import HomePage from './HomePage'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    const token = localStorage.getItem('token')
    this.state = {
      token,
      currentUser: null
    }
  }

  render () {
    return (
      <Router>
        <div>
          <Redirect to='/' />
          <Nav token={this.state.token} handleLogout={() => this.handleLogout()} currentUser={this.state.currentUser} />
          <div style={{margin: '9vh 0 0 0'}}>
            <Route path='/login' component={
              () => (
                <Login handleLogin={(token) => this.handleLogin(token)} token={this.state.token} />
              )
            } />
            <Route path='/signup' component={
              () => (
                <Signup />
              )
            } />
            <Route path='/blog/:id' component={
              ({match}) => (
                <BlogPage id={match.params.id} />
              )
            } />
            <Route path='/profile' component={
              () => (
                <Profile token={this.state.token} currentUser={this.state.currentUser} />
              )
            } />
            <Route path='/edit-blogpage/:id' component={
              ({match}) => (
                <EditBlogPage token={this.state.token} id={match.params.id} />
              )
            } />
            <Route exact path='/' component={
              () => (
                <HomePage />
              )
            } />
          </div>
        </div>
      </Router>
    )
  }

  componentDidMount () {
    if(this.state.token) this.getUser()
  }

  getUser () {
    fetch('https://project-4-backend.herokuapp.com/currentuser',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json'
        }
      }
  ).then(res => res.json())
   .then(json => {
     this.setState({
       currentUser: json.current_user_name
     })
   })
   .catch(error => console.log(error))
  }

  handleLogout () {
    localStorage.removeItem('token')
    this.setState({
      token: null,
      currentUser: null
    })
  }

  handleLogin (token) {
    this.setState({
      token
    })
    this.getUser()
  }
}

export default App
