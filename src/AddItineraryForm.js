import React, {Component} from 'react'

class AddItineraryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      token: props.token,
      title: '',
      country: '',
      days: '',
      bannerUrl: ''
    }

    this.addItinerary = this.props.addItinerary
  }

  render () {
    return (
      <div>
        <h1>Create a new itinerary</h1>
        <h3>Token is: {this.state.token}</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>Title</label>{' '}
          <input type='text' value={this.state.title} onChange={(e) => this.handleChange(e, 'title')} /><br />
          <label>Country</label>{' '}
          <input type='text' value={this.state.country} onChange={(e) => this.handleChange(e, 'country')} /><br />
          <label>Number of days</label>{' '}
          <input type='number' value={this.state.days} onChange={(e) => this.handleChange(e, 'days')} /><br />
          <label>Banner image</label>{' '}
          <input type='text' value={this.state.bannerUrl} onChange={(e) => this.handleChange(e, 'bannerUrl')} /><br />
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
      data: {
        title: this.state.title,
        country: this.state.country,
        days: this.state.days,
        bannerUrl: this.state.bannerUrl
      }
    }
    console.log(params)
    fetch('https://project-4-backend.herokuapp.com/profile',
      {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          "Authorization": "Bearer " + this.state.token
        },
        body: JSON.stringify(params)
      })
      .then(res => {
        if (res.status === 200) {
          alert('Successfully created!')
          this.addItinerary()
        }
        return res.json()
      })
      .then(result => console.log(result))
      .catch(err => console.log('there is an an error: ', err))
  }

}

export default AddItineraryForm
