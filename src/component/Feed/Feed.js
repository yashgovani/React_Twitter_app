import React, { useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';
import Post from './Post/Post';
import './Feed.css';
import db from '../../service/firebase';
import TweetBox from '../TweetBox/TweetBox';

const Feed = () => {
  const [posts, setPosts] = useState([]);
/* 
   useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()));
      console.log('Rendered');
    });
  }, []);  */


  useEffect(() => {
    db.collection('posts')
      .get()
      .then((data) => {
        let screams = [];
        data.forEach((doc) => {
          screams.push({
            id: doc.id,
            displayName: doc.data().displayName,
            likes: doc.data().likes,
            text: doc.data().text,
            username: doc.data().username,
            image: doc.data().image,
            verified: doc.data().verified,
          });
        });
        setPosts(screams);
      });
  }, []); 

  /*   useEffect(() => {
    console.log('rendered');
  }, []); */



  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />

      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            displayName={post.displayName}
            username={post.username}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
            likes={post.likes}
            id={post.id}
          />
        ))}
      </FlipMove>
    </div>
  );
};

export default Feed;
