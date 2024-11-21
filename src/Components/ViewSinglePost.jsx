import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../Client';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { BiLike } from "react-icons/bi";
import "../CSS/SinglePost.css"
import NavbarButtom from './NavbarButtom';

function ViewSinglePost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [dateTimestamp, setDateTimestamp] = useState("");
  const [action, setAction] = useState("");
  const [likes, setLikes] = useState(post.number_of_upvotes);
  

  useEffect(() => {
    const getPostDetails = async () => {
      const { data } = await supabase
        .from('Posts')
        .select()
        .eq('id', postId)

      setPost(data[0]);
      setDateTimestamp(formatDate(data[0].created_at));
      
      setLikes(data[0].number_of_upvotes);
    }

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
    getPostDetails().catch(console.error);
    
  }, [])

  useEffect(() => {
    const updateLikes = async () => {
      await supabase
        .from('Posts')
        .update({ number_of_upvotes: likes })
        .eq('id', postId);
    }
    updateLikes().catch(console.error);
  }, [likes]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (e) => {
    setIsModalOpen(true);
    setAction(e.target.value);
  };

  const handleSubmitId = async (id) => {

    if(id === post.secret_key && action === "delete") {;
      await supabase
      .from('Posts')
      .delete()
      .eq('id', post.id);
      alert('Post deleted successfully! 🎉🥳');
      window.location.href = '/home';
    }
    else if(id === post.secret_key && action === "edit") {

      navigate(`/editPost/${postId}`, {state: {post}});
     
      //window.location.href = `/editPost/${id}`;
    }else{
      alert("The Secret Key is incorrect. You are unable to " + action + " this post.");
    }
  };

  const increaseUpvotes =  () => {
    setLikes(likes => likes + 1);
   }

  return (
    <div>

      <div>
        <Navbar />
      </div>


      <div className="main-container">
        <div className='singlepost-container'>
          <p className='singlePost-date'>{dateTimestamp}</p>
          {post.image != "" ? <img src={post.Image} alt="post" className='img-class' /> : <div></div>}
          <h2 className='post-title'>{post.Title}</h2>
          <div className='singlepost-footer'>
            <p>Category:</p>
            <p className='singlepost-author'>{post.Category}</p>
          </div>
          <p className="singlepost-content">{post.Description}</p>

          <div className='like-singlecontainer' onClick={increaseUpvotes}>
                  <BiLike size={18} />
                  <span> {likes}</span></div>

          <Modal 
            isOpen={isModalOpen}
            onClose={() => {
            setIsModalOpen(false)

          }}
        onSubmit={handleSubmitId}
      />
          
          <div className='single-view-buttons'>
            <button className='singlepost-edit-button' onClick={handleOpenModal} value="edit" >Edit</button>
            <button className='singlepost-delete-button' onClick={handleOpenModal} value="delete">Delete</button>
          </div>

        </div>


      </div>
      <NavbarButtom />

      

    </div>
  )
}

export default ViewSinglePost
