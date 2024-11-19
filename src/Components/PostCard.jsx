import React from 'react'
import '../CSS/PostCard.css'
import '../App.css'
function PostCard( props ) {
  return (
    <div className='main-page'>
        <div className='post-container'>
            <div className='content'>
                <h1 className='title'>{props.postTitle}</h1>
                <div className='description'>{props.postDescription}</div>
            </div>

        </div>
      
    </div>
  )
}

export default PostCard
