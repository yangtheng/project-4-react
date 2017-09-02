import React, {Component} from 'react'
import {
  Redirect
} from 'react-router-dom'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      token: ''
    }
  }

  render () {
    let alert,
      redirect
    if (this.state.token) {
      alert = (
        <div className='alert alert-success' role='alert'>
          Login successful!
        </div>
      )
      redirect = (
        <Redirect to='/' />
      )
    }
    return (
      <div className='col-sm-6 col-sm-offset-3'>
        {alert}
        {redirect}
        <h1>Login</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className='form-group'>
            <label for='exampleInputEmail1'>Email address</label>
            <input type='email' value={this.state.email} onChange={(e) => this.handleChange(e, 'email')} className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' placeholder='Enter email' />
          </div>
          <div className='form-group'>
            <label for='exampleInputPassword1'>Password</label>
            <input type='password' value={this.state.password} onChange={(e) => this.handleChange(e, 'password')} className='form-control' id='exampleInputPassword1' placeholder='Password' />
          </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
      </div>
    )
  }

  handleChange (e, field) {
    this.setState({
      [field]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
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
        else throw new Error('error')
      })
      .then(result => {
        // console.log(result.access_token)
        localStorage.setItem('token', result.access_token)
        this.setState({
          token: result.access_token
        })
       })
      .catch(function (res) { console.log(res) })
  }
}

export default Login
