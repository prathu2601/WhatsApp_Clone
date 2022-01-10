import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCeBTiZo_qApdFEY0dwJFUJq4o6DStjIPA',
  authDomain: 'whatsapp-clone-af796.firebaseapp.com',
  projectId: 'whatsapp-clone-af796',
  storageBucket: 'whatsapp-clone-af796.appspot.com',
  messagingSenderId: '963526793425',
  appId: '1:963526793425:web:b5935cdc66d0e1be964df0',
  measurementId: 'G-XP9WEGMF0G',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db
