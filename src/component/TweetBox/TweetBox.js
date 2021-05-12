import { Avatar, Button } from '@material-ui/core';
import React, { useState } from 'react';
import db from '../../service/firebase';
import './TweetBox.css';
import firebase from 'firebase';

const TweetBox = () => {
  const [tweetMessage, setTweetMessage] = useState('');
  const [tweetImage, setTweetImage] = useState('');

  var user = firebase.auth().currentUser;

  const sendTweet = (e) => {
    e.preventDefault();

    db.collection('posts')
      .add({
        displayName: user.email,
        username: 'strange spider',
        verified: true,
        text: tweetMessage,
        image: tweetImage,
        likes: 0,
        avatar:
          'https://png.pngtree.com/png-clipart/20201209/original/pngtree-cute-beautiful-cartoon-couple-avatar-png-image_5676332.jpg',
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      });

    setTweetMessage('');
    setTweetImage('');
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://png.pngtree.com/png-clipart/20201209/original/pngtree-cute-beautiful-cartoon-couple-avatar-png-image_5676332.jpg" />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        <input
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox__imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
        />
        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
};

export default TweetBox;
