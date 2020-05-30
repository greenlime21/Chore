import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDtWZKbQeRACf5cbZblbdONu0oe8PVTPPQ',
  authDomain: 'chore-app-mist.firebaseapp.com',
  databaseURL: 'https://chore-app-mist.firebaseio.com',
  projectId: 'chore-app-mist',
  storageBucket: 'chore-app-mist.appspot.com',
  messagingSenderId: '181133231357',
  appId: '1:181133231357:web:52a229653746193e602a94',
  measurementId: 'G-ZNHHV68H8B'
}
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp
