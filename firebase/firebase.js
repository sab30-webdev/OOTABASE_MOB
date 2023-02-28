// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_SENDER_ID,
  REACT_APP_APP_ID,
} from "@env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB0RmV88aG2iHvGFHn04rifyZ92ZlrgN1I",
//   authDomain: "ootabase.firebaseapp.com",
//   projectId: "ootabase",
//   storageBucket: "ootabase.appspot.com",
//   messagingSenderId: "1027804451662",
//   appId: "1:1027804451662:web:75e472e7c4d39d6955041f",
// };
const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_SENDER_ID,
  appId: REACT_APP_APP_ID,
};

function initApp() {
  initializeApp(firebaseConfig);
}

export default initApp;
