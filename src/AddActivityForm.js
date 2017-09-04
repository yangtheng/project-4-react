import React, {Component} from 'react'

class AddActivityForm extends Component {
  constructor (props) {
    super(props)
    this.state = {day: '', place: '', blurb: '', content: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    console.log(this.state)
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Day
            <input type='number' name="day" value={this.state.day} onChange={this.handleChange} />
          </label>
          <label>
            Place
            <input type='text' name="place" value={this.state.place} onChange={this.handleChange} />
          </label>
          <label>
            Blurb
            <input type='text' name="blurb" value={this.state.blurb} onChange={this.handleChange} />
          </label>
          <label>
            Content
            <input type='text' name="content" value={this.state.content} onChange={this.handleChange} />
          </label>
          <button type='submit'>Add activity</button>
        </form>
      </div>
    )
  }
}

export default AddActivityForm
