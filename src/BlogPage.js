import React from 'react'
import CoverPhoto from './CoverPhoto'
import ActivitiesBar from './ActivitiesBar'
import ActivityBody from './ActivityBody'

const BlogPage = () => (
  <div>
    <CoverPhoto itinerary='' />
    <ActivitiesBar />
    <div style={{width: '80%', padding: '5px', margin: '5% 5% 0 0', display: 'inline-block', float: 'right'}}>
      <ActivityBody id='breakfast' />
      <ActivityBody id='lunch' />
      <ActivityBody id='dinner' />
    </div>
  </div>
)

export default BlogPage
