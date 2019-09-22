import firebase from "firebase/app";
import { firestore } from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDud81neFHVCuJgrHagKjHbVqsoCZZnHik",
  authDomain: "facebook-ads-bfc19.firebaseapp.com",
  databaseURL: "https://facebook-ads-bfc19.firebaseio.com",
  projectId: "facebook-ads-bfc19",
  storageBucket: "",
  messagingSenderId: "599134915104",
  appId: "1:599134915104:web:b043e48a5cbeda63"
};

console.log("init");
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}
const db = firestore();

const addToCollection = async (collection, entry) => {
  return db
    .collection(collection)
    .add(entry)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      return docRef;
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};
export { firebase, addToCollection, db };
