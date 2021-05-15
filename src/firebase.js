import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAZFVfkhfHnrzblArrLd2EpUqq5kQounpg",
    authDomain: "wechat-app-6f57e.firebaseapp.com",
    projectId: "wechat-app-6f57e",
    storageBucket: "wechat-app-6f57e.appspot.com",
    messagingSenderId: "659992827712",
    appId: "1:659992827712:web:36e4e908c02c2a48484ca5",
    measurementId: "G-Z96G7PHFWG"
  };

  const firebaseApp =firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;