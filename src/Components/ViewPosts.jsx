import React, { useEffect, useState } from 'react'
import { supabase } from '../../Client';
import PostCard from './PostCard';

function ViewPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const fetchPosts = async () => {
            const { data } = await supabase
            .from('Posts')
            .select()
            .order('created_at', {ascending: true});

            setPosts(data);
            console.log(data);
        };

        
        fetchPosts().catch(console.error);
    }, []);

  return (
    <>
    <div>
        {posts && posts.length > 0 ? 
        ((posts.map((post) => {
            return <PostCard postTitle={post.Title} imgUrl={post.Image} postDescription={post.Description}/>
        }))) 
        : 
        (<div><h1>There are currently no posts</h1></div>)}
    </div>
    </>
  )
}

export default ViewPosts
