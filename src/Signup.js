import React, {Component} from 'react'

class Signup extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
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
          <label>Confirm Password</label>{' '}
          <input type='password' value={this.state.password_confirmation} onChange={(e) => this.handleChange(e, 'password_confirmation')} /><br />
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
      user: {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
      }
    }
    fetch('http://localhost:3000/users.json',
      {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(params)
      })
      .then(res => {
        if (res.status === 201) alert('Successfully created!')
        return res.json()
      })
      .then(result => console.log(result))
      .catch(err => console.log('there is an an error: ', err))
  }
}

export default Signup
