import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Components/Navbar'
import { supabase } from '../Client'
import ViewPosts from './Components/ViewPosts'
import PostCard from './Components/PostCard'
import './App.css'
import Login from './Components/Login'

function App() {
  const [count, setCount] = useState(0)
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
      <Login />
    </div>
      {/* <div>
        <Navbar />
      </div>

      <div>
        {posts && posts.length > 0 ? 
        ((posts.map((post) => {
        
         return <PostCard postTitle={post.Title} imgUrl={post.Image} postDescription={post.Description}/>
        }))) 
        : 
        (<div><h1>There are currently no posts</h1></div>)}
    </div> */}
{/* 
    <div>
      <ViewPosts />
    </div> */}
    </>
  )
}

export default App
