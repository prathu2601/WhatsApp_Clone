import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCA1K6ngVg2AynVVQk4Ou9Ug2aA05AR8p8',
  authDomain: 'whatsappclone-a5c27.firebaseapp.com',
  projectId: 'whatsappclone-a5c27',
  storageBucket: 'whatsappclone-a5c27.appspot.com',
  messagingSenderId: '877988151754',
  appId: '1:877988151754:web:4bc313a9c07d027c0a4f33',
  measurementId: 'G-80FMR6MTY2',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db
