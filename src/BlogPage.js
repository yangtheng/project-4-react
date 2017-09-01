import React from 'react'
import CoverPhoto from './CoverPhoto'
import ActivitiesBar from './ActivitiesBar'
import ActivityBody from './ActivityBody'

const BlogPage = () => (
  <div>
    <CoverPhoto itinerary='' />
    <div>
      <ActivitiesBar />
      <div style={{width: '80vw', padding: '5px', margin: '3vh 5% 0 0', display: 'inline-block', float: 'right'}}>
        <ActivityBody id='breakfast' />
        <ActivityBody id='lunch' />
        <ActivityBody id='dinner' />
      </div>
    </div>
  </div>
)

export default BlogPage
