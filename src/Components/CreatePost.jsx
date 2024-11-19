import React, { useState } from 'react'
import Navbar from './Navbar'
import '../CSS/CreatePost.css'
import { supabase } from '../../Client'

const CreatePost = () => {
  const [postData, setPostData] = useState({
    postTitle: '',
    postDescription: '',
    imgUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevState) => {
        return {
            ...prevState,
            [name]: value
        }
    });

    if(name === 'postTitle') {
        console.log('Post Title:', value);
    }
};

  const createPost = async (e) => {
    e.preventDefault();

    if(postData.postTitle === '') {
        alert('Please fill in the Title!');
        return;
    }

    if(postData.postDescription === '') {
        alert('Please fill in the Description!');
        return;
    }
    
    await supabase
    .from('Posts')
    .insert(
        { Title: postData.postTitle, Description: postData.postDescription, Image: postData.imgUrl })
        .select();
    alert('Post created successfully! 🎉🥳');

    window.location.href = '/home';
  };

  return (
    <div>

        <div>
            <Navbar />
        </div>

        <div className='headings'>
            <h1>Create a post!</h1>
            <h3 className="h3-heading"><i>Share your ideas for a more sustainable lifestyle!</i></h3>
        </div>

        <form className='form-container'>
            
            <div className='card'>
            <label>
                <h3>Title<span aria-hidden="true" style={{ color: postData.postTitle ? '#213547' : 'red' }}>*</span></h3>
            </label>
            <input className='input-style' type='text' id='postTitle' name='postTitle' placeholder='Enter post title' required onChange={handleChange}></input>
            <br></br>

            <label>
                <h3>Description<span aria-hidden="true" style={{ color: postData.postDescription ? '#213547' : 'red' }}>*</span></h3>
            </label>
            <textarea className='input-style' id='postDescription' name='postDescription' placeholder='Enter post description' required rows="7" onChange={handleChange}></textarea>

            <br></br>

            <label>
                <h3>Image URL</h3>
            </label>
            <input  className='input-style' type='url' id='imgUrl' name='imgUrl' placeholder='Enter image URL' onChange={handleChange}></input>

            <br></br><br></br>

            <input type='submit' value="Submit" className='button' onClick={createPost}></input>
            </div>
        </form>

    </div>
  )
}

export default CreatePost
