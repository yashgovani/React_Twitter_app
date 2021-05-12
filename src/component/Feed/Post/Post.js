import { Avatar, TextField, Button, Modal } from '@material-ui/core';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';
import { makeStyles } from '@material-ui/core/styles';
import {
  ChatBubbleOutline,
  FavoriteBorder,
  Repeat,
  Share,
  VerifiedUser,
} from '@material-ui/icons';
import React, { forwardRef, useEffect, useState } from 'react';
import './Post.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
//import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import db from '../../../service/firebase';
import firebase from 'firebase';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
  },
}));

const Post = forwardRef(
  (
    { displayName, username, verified, text, image, avatar, likes, id },
    ref
  ) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [opt, setOpt] = useState(false);
    const [comment, setComment] = useState('');
    const [cmt, setCmt] = useState([]);
    const [data, setData] = useState([]);

    var user = firebase.auth().currentUser;

    const shareButtonProps = {
      url: 'http://localhost:3000/twitter',
      network: 'Facebook',
      text: 'Give it a try - react-custom-share component',
      longtext:
        'Social sharing buttons for React. Use one of the build-in themes or create a custom one from the scratch.',
    };

    useEffect(() => {
      db.collection('likes')
        .get()
        .then((data) => {
          let screams = [];
          data.forEach((doc) => {
            screams.push({
              userid: doc.data().userid,
              postId: doc.data().postId,
            });
          });
          console.log(screams);
          setData(screams);
        });
    }, []);

    const likedPost = () => {
      if (
        data &&
        user.uid &&
        data.find((like) => like.postId === id && like.userid === user.uid)
      ) {
        return true;
      } else return false;
    };
    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
      db.collection('comments')
        .get()
        .then((data) => {
          let screams = [];
          data.forEach((doc) => {
            if (id === doc.data().id) {
              screams.push({
                id: doc.id,
                email: doc.data().email,
                did: doc.data().id,
                comment: doc.data().comment,
              });
            }
          });
          setCmt(screams);
        });
    }, [cmt, id]);

    const handleopt = () => {
      setOpt(!opt);
    };

    const commentSubmit = (e) => {
      e.preventDefault();
      db.collection('comments').add({
        email: user.email,
        comment: comment,
        id: id,
      });
      setComment('');
      setOpt(!opt);
    };

    const likePost = (id) => {
      const likeDocument = db
        .collection('likes')
        .where('postId', '==', id)
        .where('userid', '==', user.uid)
        .limit(1);

      const postDocument = db.doc(`/posts/${id}`);

      let postData;

      postDocument
        .get()
        .then((doc) => {
          if (doc.exists) {
            postData = doc.data();
            postData.postId = doc.id;
            return likeDocument.get();
          } else {
            return { error: 'Post not found' };
          }
        })
        .then((data) => {
          if (data.empty) {
            return db
              .collection('likes')
              .add({
                postId: id,
                userid: user.uid,
              })
              .then(() => {
                postData.likes++;
                return postDocument.update({ likes: postData.likes });
              })
              .then(() => {
                console.log(postData);
              });
          } else {
            return { error: 'Post already liked' };
          }
        });
    };

    const unlikePost = (id) => {
      const likeDocument = db
        .collection('likes')
        .where('postId', '==', id)
        .where('userid', '==', user.uid)
        .limit(1);
      const postDocument = db.doc(`/posts/${id}`);

      let postData;

      postDocument
        .get()
        .then((doc) => {
          if (doc.exists) {
            postData = doc.data();
            postData.postId = doc.id;
            console.log(postData);

            return likeDocument.get();
          } else {
            return { error: 'Post not found' };
          }
        })
        .then((data) => {
          if (data.empty) {
          } else {
            return db
              .doc(`/likes/${data.docs[0].id}`)
              .delete()
              .then(() => {
                postData.likes--;
                return postDocument.update({ likes: postData.likes });
              });
          }
        });
    };
    const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2>Select the platform</h2>
        <div style={{ marginRight: '5px' }}>
          <FacebookShareButton {...shareButtonProps}>
            <FacebookIcon logoFillColor="white" />
          </FacebookShareButton>
        </div>
        <div style={{ marginRight: '5px' }}>
          <WhatsappShareButton {...shareButtonProps}>
            <WhatsappIcon logoFillColor="white" />
          </WhatsappShareButton>
        </div>
      </div>
    );

    const likeButton = likedPost() ? (
      <Button tip="Undo like" onClick={() => unlikePost(id)}>
        <FavoriteIcon color="primary" size="small" />
      </Button>
    ) : (
      <Button tip="Like" onClick={() => likePost(id)}>
        <FavoriteBorder color="primary" size="small" />
      </Button>
    );

    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={avatar} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}
                <span className="post__headerSpecial">
                  {verified && <VerifiedUser className="post__badge" />}@
                  {username}
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          <img src={image} alt="" />
          <div className="post__footer">
            <div onClick={handleopt}>
              <ChatBubbleOutline fontSize="small" />
              {cmt.length}
            </div>
            <Repeat fontSize="small" />
            {/* <div onClick={() => likePost(id)}>
              <FavoriteBorder fontSize="small" />
              {likes}
            </div> */}
            <div>
              {likeButton}
              {likes}
            </div>
            <div onClick={handleOpen}>
              <Share fontSize="small" />
            </div>
          </div>
          {opt ? (
            <form>
              <TextField
                variant="outlined"
                label="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                variant="outlined"
                color="secondary"
                onClick={commentSubmit}
                type="submit"
              >
                SUBMIT
              </Button>
            </form>
          ) : null}
          {opt ? (
            <Button onClick={handleopt} color="primary">
              Cancel
            </Button>
          ) : null}
          {opt
            ? cmt.map((data) => (
                <div key={data.id}>
                  <p>{data.email}</p>
                  <p>{data.comment}</p>
                </div>
              ))
            : null}
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    );
  }
);

export default Post;
