import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCi5366e-I8MXCD979TKiUxplGsSw81d0Q",
  authDomain: "videolearn-ae4bc.firebaseapp.com",
  databaseURL: "https://videolearn-ae4bc.firebaseio.com",
  projectId: "videolearn-ae4bc",
  storageBucket: "videolearn-ae4bc.appspot.com",
  messagingSenderId: "36149314389",
  appId: "1:36149314389:web:937f8bd9e4b4d8b21e65dc",
  measurementId: "G-HEXRKLHY9D"
};
var fire = firebase.initializeApp(config);

export default fire;
