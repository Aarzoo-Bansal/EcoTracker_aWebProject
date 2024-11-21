import React, { useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom';
import '../CSS/CreatePost.css'
import { supabase } from '../../Client'
import NavbarButtom from './NavbarButtom';

const EditAPost = () => {
    const location = useLocation();
    const postOldData = location.state;
    console.log(postOldData.post.id);

    const [postTitle, setPostTitle] = useState(postOldData.post.Title);
    const [category, setPostCategory] = useState(postOldData.post.Category);
    const [postDescription, setPostDescription] = useState(postOldData.post.Description);
    const [imgUrl, setImgUrl] = useState(postOldData.post.Image);
    const [secretKey, setSecretKey] = useState(postOldData.post.secret_key);

    const [categories, setCategory] = useState([{
        name: 'Suggestion'
    },
    { name: 'Question' },
    { name: 'Achievement' }
    ])

    const [isVisible, setIsVisible] = useState(false);

    const editPost = async (e) => {
        e.preventDefault();

        if (postTitle === '') {
            alert('Please fill in the Title!');
            return;
        }

        if (postDescription === '') {
            alert('Please fill in the Description!');
            return;
        }

        if (category === '') {
            alert('Please fill in the Description!');
            return;
        }

        if (secretKey === '') {
            alert('Please fill in the Description!');
            return;
        }

        console.log(postTitle, postDescription, imgUrl, secretKey, category);

        await supabase
            .from('Posts')
            .update(
                { Title: postTitle, Description: postDescription, Image: imgUrl, secret_key: secretKey, Category: category })
            .eq('id', postOldData.post.id);

        alert('Post edited successfully! 🎉🥳');
        window.location.href = '/home';
    };

    return (
        <div>

            <div>
                <Navbar />
            </div>

            <div className='headings'>
                <h3 className="h3-heading"><i>Edit your post!</i></h3>
            </div>

            <form className='form-container'>

                <div className='card'>
                    <label>
                        <h3>Title<span aria-hidden="true" style={{ color: postTitle ? '#213547' : 'red' }}>*</span></h3>
                    </label>
                    <input className='input-style' type='text' id='postTitle' name='postTitle' placeholder='Enter post title' required value={postTitle} onChange={(e) => setPostTitle(e.target.value)}></input>
                    <br></br>

                    <label>
                        <h3>Category<span aria-hidden="true" style={{ color: category ? '#213547' : 'red' }}>*</span></h3>
                    </label>
                    <div className='category-container'>
                        {categories.map((category) => (
                            <div className='options-container'>
                                <input type='radio' name='category' value={category.name} id="category" checked required onChange={(e) => setPostCategory(e.target.value)}></input>
                                <label className='label' >{category.name}</label>
                            </div>
                        ))}
                    </div>

                    <label>
                        <h3>Description<span aria-hidden="true" style={{ color: postDescription ? '#213547' : 'red' }}>*</span></h3>
                    </label>
                    <textarea className='input-style' id='postDescription' name='postDescription' placeholder='Enter post description' required rows="7" value={postDescription} onChange={(e) => setPostDescription(e.target.value)}></textarea>

                    <br></br>

                    <label>
                        <h3>Image URL</h3>
                    </label>
                    <input className='input-style' type='url' id='imgUrl' name='imgUrl' placeholder='Enter image URL' value={imgUrl} onChange={(e) => setImgUrl(e.target.value)}></input>

                    <div
                        onMouseEnter={() => setIsVisible(true)}
                        onMouseLeave={() => setIsVisible(false)}
                        className="tooltip-container">
                        <label>
                            <h3>Secret Key<span aria-hidden="true" style={{ color: secretKey ? '#213547' : 'red' }}>*</span></h3>
                        </label>

                        <input
                            className='input-style'
                            type='text'
                            id='secretKey'
                            name='secretKey'
                            value={secretKey}
                            placeholder='Enter the secret key'
                            autocomplete="new-password"
                            onChange={(e) => setSecretKey(e.target.value)}>
                        </input>

                        {isVisible && (
                            <div className="tooltip-content">
                                <i> Please remember this key. It will be used to edit or delete the post!</i>
                            </div>
                        )}
                    </div>
                    <br></br><br></br>
                    <input type='submit' value="Submit" className='button' onClick={editPost}></input>
                </div>
            </form>

            <NavbarButtom />
        </div>
    )
}

export default EditAPost
