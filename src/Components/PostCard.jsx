import React from 'react'
import {useState, useEffect} from 'react'
import '../CSS/PostCard.css'
import '../App.css'
import { Link } from 'react-router-dom'
import { BiLike } from "react-icons/bi";

function PostCard( props ) {
  const [date, setDate] = useState(props.postCreation);

  useEffect(() => {
    setDate(formatDate(props.postCreation));
  }, [props.postCreation]);

  const formatDate = (dateData) => {
    const date = new Date(dateData);
  
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
}
  return (
    <div className='main-page'>
        <div className='post-container'>
            <div className='content'>
              <div className='date-css'>
                <p>{date}</p>
              </div>
                <Link to={`/viewPost/${props.postId}`}> 
                <h1 className='title'>{props.postTitle}</h1>
                <div className='description'>{props.postDescription}</div>
                <div className='like-container'>
                  <BiLike size={18}/>
                  <span> {props.postLikes}</span></div>
                </Link> 
            </div>

        </div>
      
    </div>
  )
}

export default PostCard
