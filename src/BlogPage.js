import React, {Component} from 'react'
import CoverPhoto from './CoverPhoto'
import ActivitiesBar from './ActivitiesBar'
import ActivityBody from './ActivityBody'

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
      itinerary: {}
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
          } else return -1
        })] || []} />)
        activityIndex += 1
      })
    }
    return (
      <div>
        <CoverPhoto itinerary={this.state.itinerary} author={this.state.author} />
        <div>
          <ActivitiesBar days={this.state.days} activities={this.state.activities} />
          <div style={{width: '80vw', padding: '5px', margin: '3vh 5% 0 0', display: 'inline-block', float: 'right'}}>
            {activityBodies}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    fetch(`${url}/blog/${this.state.itinerary_id}`
      // {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': 'Bearer ' + this.state.token,
      //     'Content-Type': 'application/json'
      //   }
      // }
    )
    .then(res => {
      if (res.status === 200) return res.json()
    })
    .then(json => {
      console.log(json);
      this.setState({
        title: json.requestedBlog.title,
        author: json.name,
        days: json.requestedBlog.days,
        activities: json.activities,
        itinerary: json.requestedBlog,
        photos: json.photos
      })
    })
  }
}

export default BlogPage
