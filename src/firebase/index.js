import * as firebase from 'firebase';


const config = {
    apiKey: "AIzaSyC0eVfyQE_wiC-mZ_bfpJdjlax_xJ8Tv_E",
    authDomain: "emergeo-4496e.firebaseapp.com",
    databaseURL: "https://emergeo-4496e.firebaseio.com",
    projectId: "emergeo-4496e",
    storageBucket: "emergeo-4496e.appspot.com",
    messagingSenderId: "613936575014"
  };


  firebase.initializeApp(config);

  export const app = firebase.initializeApp;

  export const database = firebase.database();

  export const auth = firebase.auth();