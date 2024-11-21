import React, { useState } from 'react'
import Navbar from './Navbar'
import '../CSS/CreatePost.css'
import { supabase } from '../../Client'
import NavbarButtom from './NavbarButtom'


const CreatePost = () => {
  const [postData, setPostData] = useState({
    postTitle: '',
    postDescription: '',
    imgUrl: '',
    secretKey: '',
    category: ''
  });

  const [categories, setCategory] = useState([{
    name: 'Suggestion'},
    {name: 'Question'},
    {name: 'Achievement'}
  ])

  const [isVisible, setIsVisible] = useState(false);

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
        { Title: postData.postTitle, Description: postData.postDescription, Image: postData.imgUrl, secret_key: postData.secretKey, Category: postData.category, number_of_upvotes:0 })
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
                <h3>Category<span aria-hidden="true" style={{ color: postData.category ? '#213547' : 'red' }}>*</span></h3>
                </label>
            <div className='category-container'>
                {categories.map((category) => (
                    <div className='options-container'>
                    <input type='radio' name='category' value={category.name} onChange={handleChange} id="category" required></input>
                    <label className='label' >{category.name}</label>
                    </div>
                    
            ))}
            </div>

            <label>
                <h3>Description<span aria-hidden="true" style={{ color: postData.postDescription ? '#213547' : 'red' }}>*</span></h3>
            </label>
            <textarea className='input-style' id='postDescription' name='postDescription' placeholder='Enter post description' required rows="7" onChange={handleChange}></textarea>

            <br></br>

            <label>
                <h3>Image URL</h3>
            </label>
            <input  className='input-style' type='text' id='imgUrl' name='imgUrl' placeholder='Enter image URL' onChange={handleChange}></input>

            <div
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            className="tooltip-container">
            <label>
                <h3>Secret Key<span aria-hidden="true" style={{ color: postData.secretKey ? '#213547' : 'red' }}>*</span></h3>
            </label>

            <input  
                className='input-style' 
                type='password' 
                id='secretKey' 
                name='secretKey' 
                placeholder='Enter the secret key' 
                autocomplete="new-password"   
                onChange={handleChange}>    
            </input>

{isVisible && (
        <div className="tooltip-content">
         <i> Please remember this key. It will be used to edit or delete the post!</i>
        </div>
      )}
            </div>
            <br></br><br></br>
            <input type='submit' value="Submit" className='button' onClick={createPost}></input>
            </div>
        </form>
        <NavbarButtom />

    </div>
  )
}

export default CreatePost
