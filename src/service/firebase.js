import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCsmVtExuPqQw230euXpZ-krA8GG3y1dGE',
  authDomain: 'twitter-513a3.firebaseapp.com',
  databaseURL: 'https://twitter-513a3-default-rtdb.firebaseio.com/',
  projectId: 'twitter-513a3',
  storageBucket: 'twitter-513a3.appspot.com',
  messagingSenderId: '758252570355',
  appId: '1:758252570355:web:7bbd66766c8db259a09986',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export const auth = firebase.auth;

export default db;
