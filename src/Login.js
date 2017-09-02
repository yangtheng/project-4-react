import React, {Component} from 'react'

class Login extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>Email</label>{' '}
          <input type='email' value={this.state.email} onChange={(e) => this.handleChange(e, 'email')} /><br />
          <label>Password</label>{' '}
          <input type='password' value={this.state.password} onChange={(e) => this.handleChange(e, 'password')} /><br />
          <input type='submit' value='Submit' />
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
      password: this.state.password,
    }
    fetch('https://project-4-backend.herokuapp.com/oauth/token',
      {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(params)
      })
      .then(function (res) { console.log(res.json()) })
      .catch(function (res) { console.log(res) })
  }
}

export default Login
