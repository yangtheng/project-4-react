import React, {Component} from 'react'

class Signup extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  render () {
    return (
      <div>
        <h1>Signup</h1>
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
    console.log(this.state)
    fetch('/users',
      {
        method: 'POST',
        body: JSON.stringify(this.state)
      })
      .then(function (res) { console.log(res) })
      .catch(function (res) { console.log(res) })
  }
}

export default Signup
