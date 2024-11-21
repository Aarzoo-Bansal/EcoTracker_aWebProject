import React, { useEffect, useState } from 'react'
import { supabase } from '../../Client';
import PostCard from './PostCard';
import '../CSS/ViewPost.css';

function ViewPosts() {
    const [posts, setPosts] = useState([]);
    const [postsResult, setPostResult] = useState(null);
    const [name, setName] = useState("");

    useEffect(() => {

        const fetchPosts = async () => {
            const { data } = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: true });
            setPosts(data);
            setPostResult(data);
        };
        fetchPosts().catch(console.error);
    }, []);



    const handleFilter = async (e) => {
        e.preventDefault();

        const { data } = await supabase
            .from('Posts')
            .select()
            .ilike('Title', `%${name}%`);
        setPosts(data);
        console.log(data);
    }

    const sortData = async (e) => {
        e.preventDefault();
    
        if(e.target.value === 'date') {
            posts.reverse();
            setPosts([...posts]);
            return;
        }

        if(e.target.value === 'upVotes') {
            posts.sort((a, b) => {
                return b.number_of_upvotes - a.number_of_upvotes;
            });
            setPosts([...posts]);
            return;
        }

        if(e.target.value === '') {
           
            setPosts([...postsResult]);
            return;
        }

     }


    return (
        <>
            <div className='filter-container'>
                <form onSubmit={handleFilter}>
                    <div className='filter-container'>
                        <input
                            type="text"
                            value={name}
                            placeholder="Enter title to search..."
                            onChange={(e) => setName(e.target.value)} />
                        <button type="submit" className='filter-button'>Filter</button>
                        

                        <select name="dropdown" className='sort-filter' onChange={sortData}>
                            <option value="" selected >None </option>
                            <option value="date">Date Created Descending</option>
                            <option value="upVotes">Number of Upvotes</option>
                        </select>

                    </div>


                </form>
            </div>
            <div>
                {posts && posts.length > 0 ?
                    ((posts.map((post) => {
                        return <PostCard postTitle={post.Title} imgUrl={post.Image} postDescription={post.Description} postId={post.id} postCreation={post.created_at} postLikes={post.number_of_upvotes} />
                    })))
                    :
                    (<div><h1>There are currently no posts</h1></div>)}
            </div>
        </>
    )
}

export default ViewPosts
