import React, {Component} from 'react'
import {
  Link
} from 'react-router-dom'

class Signup extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      signedUp: false
    }
  }

  render () {
    let alert
    if (this.state.signedUp) {
      alert = (
        <div className='alert alert-success' role='alert'>
          <strong>You have signed up successfully!</strong> Click <Link className='alert-link' to='/login'>here</Link> to login.
        </div>
      )
    }

    return (
      <div className='col-sm-6 col-sm-offset-3'>
        {alert}
        <h1>Signup</h1>
        <div className='form-group'>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label>Name</label>{' '}
            <input className='form-control' placeholder='Enter name' type='text' value={this.state.name} onChange={(e) => this.handleChange(e, 'name')} /><br />
            <label>Email</label>{' '}
            <input className='form-control' aria-describedby='emailHelp' placeholder='Enter email' type='email' value={this.state.email} onChange={(e) => this.handleChange(e, 'email')} /><br />
            <label>Password</label>{' '}
            <input className='form-control' placeholder='Password' type='password' value={this.state.password} onChange={(e) => this.handleChange(e, 'password')} /><br />
            <label>Confirm Password</label>{' '}
            <input className='form-control' placeholder='Confirm password' type='password' value={this.state.password_confirmation} onChange={(e) => this.handleChange(e, 'password_confirmation')} /><br />
            <button type='submit' className='btn btn-primary'>Submit</button>
          </form>
        </div>
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
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
      }
    }
    fetch('https://project-4-backend.herokuapp.com/users.json',
      {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(params)
      })
      .then(res => {
        if (res.status === 201) {
          this.setState({
            signedUp: true
          })
        }
        return res.json()
      })
      .then(result => {
        if (result.errors) {
          throw new Error(result.errors.email[0])
        }
      })
      .catch(err => console.log('there is an an error: ', err))
  }
}

export default Signup
