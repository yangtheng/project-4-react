import React, {Component} from 'react'
import {
  Redirect
} from 'react-router-dom'
import Spinner from './Spinner'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      token: this.props.token,
      authenticationFail: false,
      submitting: false
    }

    this.handleLogin = this.props.handleLogin
  }

  render () {
    let redirect, authFailAlert
    if (this.state.token) {
      redirect = (
        <Redirect to='/' />
      )
    }
    if (this.state.authenticationFail) {
      authFailAlert = (
        <div className='alert alert-warning' role='alert'>
          <strong>You have entered an invalid email/ password.</strong>
        </div>
      )
    }
    if (this.state.submitting) {
      return (
        <Spinner loading={this.state.loading} />
      )
    } else {
      return (
        <div className='col-sm-6 col-sm-offset-3' style={{marginTop: '15vh'}}>
          {redirect}
          {authFailAlert}
          <h1>Login</h1>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className='form-group'>
              <label>Email address</label>
              <input type='email' value={this.state.email} onChange={(e) => this.handleChange(e, 'email')} className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Enter email' />
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input type='password' value={this.state.password} onChange={(e) => this.handleChange(e, 'password')} className='form-control' id='exampleInputPassword1' placeholder='Password' />
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </form>
        </div>
      )
    }
  }

  handleChange (e, field) {
    this.setState({
      [field]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.setState({
      submitting: true
    })
    const params = {
      grant_type: 'password',
      email: this.state.email,
      password: this.state.password
    }

    fetch('https://project-4-backend.herokuapp.com/oauth/token',
      {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(params)
      })
      .then(res => {
        if (res.status === 200) return res.json()
        else throw new Error('Please check your email and password!')
      })
      .then(result => {
        localStorage.setItem('token', result.access_token)
        this.handleLogin(result.access_token)
       })
      .catch((res) => {
        this.setState({
          authenticationFail: true,
          submitting: false
        })
      })
  }
}

export default Login
