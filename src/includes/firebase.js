import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import apiKey from '../../apiKey';

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: 'vue-music-app-4eb47.firebaseapp.com',
  projectId: 'vue-music-app-4eb47',
  storageBucket: 'vue-music-app-4eb47.appspot.com',
  appId: '1:364775604266:web:2eb98ace4d4cfe037cc353',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');

export { auth, db, storage, usersCollection, songsCollection };
