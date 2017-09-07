import React, {Component} from 'react'
import CoverPhoto from './CoverPhoto'
import ActivitiesBar from './ActivitiesBar'
import ActivityBody from './ActivityBody'
import Spinner from './Spinner'

const url = 'https://project-4-backend.herokuapp.com'

class BlogPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      itinerary_id: props.id,
      title: '',
      author: '',
      days: '',
      photos: [],
      activities: [],
      itinerary: {},
      loading: true
    }
  }

  render () {
    let activityBodies = [],
      photos = this.state.photos,
      activityIndex = 0
    for (var i = 1; i <= this.state.days; i++) {
      let j = i
      this.state.activities.filter(activity => activity.day === j).forEach(activity => {
        activityBodies.push(<ActivityBody key={activity.id + 9999} activity={activity} photos={photos[photos.findIndex(photo => {
          if (photo[0]) {
            return photo[0].activity_id === activity.id
          } else return false
        })] || []} />)
        activityIndex += 1
      })
    }
    if (this.state.loading || (this.props.token && !this.props.currentUser)) {
      return (
        <Spinner loading={this.state.loading || (this.props.token && !this.props.currentUser)} />
      )
    } else {
      return (
        <div>
          <CoverPhoto token={this.props.token} currentUser={this.props.currentUser} itinerary={this.state.itinerary} author={this.state.author} activities={this.state.activities} />
          <div>
            <ActivitiesBar days={this.state.days} activities={this.state.activities} />
            <div style={{width: '75vw', padding: '5px', margin: '3vh 0 0 0', display: 'inline-block', float: 'right'}}>
              {activityBodies}
            </div>
          </div>
        </div>
      )
    }
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    fetch(`${url}/blog/${this.state.itinerary_id}`)
    .then(res => {
      if (res.status === 200) return res.json()
    })
    .then(json => {
      this.setState({
        title: json.requestedBlog.title,
        author: json.name,
        days: json.requestedBlog.days,
        activities: json.activities.sort((a, b) => a.created_at > b.created_at),
        itinerary: json.requestedBlog,
        photos: json.photos,
        loading: false
      })
    })
  }
}

export default BlogPage
