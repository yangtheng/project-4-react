import React, {Component} from 'react'

class Login extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  render () {
    return <h1>This is login</h1>
  }
}

export default Login
