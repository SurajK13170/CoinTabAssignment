// PostPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CsvDownload = ({ data }) => {
    const handleDownload = () => {
      const csvContent = generateCsv(data.map(({title, body}) => ({title, body})));
  
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'posts.csv');
      document.body.appendChild(link);
  
      link.click();
  
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    };
  
    const generateCsv = (data) => {
      let csvContent = 'Title,Body\n';
      data.forEach(({ title, body }) => {
        csvContent += `"${title.replace(/"/g, '""')}","${body.replace(/"/g, '""')}"\n`;
      });
      return csvContent;
    };
  
    return (
      <button onClick={handleDownload}>Download In Excel</button>
    );
  };


function PostPage() {
    const { userId } = useParams();
    const [posts, setPosts] = useState([]);
    const [userPost, setUserPost] = useState(null)
    const [isAdding, setAdding] = useState(false)

    const fetchUserPost = async () => {
        try{
            const response = await fetch(`https://sore-red-basket-clam-kit.cyclic.app/posts/${userId}`)
            const userPost = await response.json()
            setUserPost(userPost)
        }catch(e){}
    }

    const fetchData = async () => {
        try {
            // Fetch posts for the specific userId
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUserPost()
            fetchData();
        }
    }, []);

    const addPost = async () => {
        try {
            setAdding(true)
            const response = await fetch('https://sore-red-basket-clam-kit.cyclic.app/posts', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(posts.map(({title, body}) => ({title, body, userId})))
            })
            const userPost = await response.json()
            setUserPost(userPost)
        } catch (error) {
            console.log('Error: ', error)
        }finally{
            setAdding(false)
        }
    }

    return (
        <div style={{padding: 20}}>
            <h1>Posts</h1>
            {userId && (
                <>
                    {/* Display user information */}
                    <h2>User Information</h2>
                    <p>User ID: {userId}</p>
                    {/* Display posts */}
                    <h2>Posts</h2>
                    <ul style={{padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10}}>
                        {posts.map(post => (
                            <li key={post.id} style={{listStyle: 'none', border: '1px solid lightgrey', borderRadius: 5, padding: 10}}>
                                <h3 style={{margin: 0}}>{post.title}</h3>
                                <p style={{marginTop: 10}}>{post.body}</p>
                            </li>
                        ))}
                    </ul>
                    {
                        userPost ? (
                            <CsvDownload data={posts} />
                        ):<button onClick={addPost} disabled={isAdding}>Bulk Post</button>
                    }
                    <div>
                    </div>
                </>
            )}
        </div>
    );
}

export default PostPage;
