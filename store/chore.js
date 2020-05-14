import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const todosRef = db.collection('todos')

export const state = () => ({
  todos: []
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('todos', todosRef)
  }),
  add: firestoreAction((context, title) => {
    if (title.trim()) {
      todosRef.add({
        title: title,
        done: false,
        // created: firebase.firestore.FieldValue.serverTimestamp(),
        // deadline: firebase.firestore.FieldValue.serverTimestamp(),
        point: 1
      })
    }
  }),
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()
  }),
  
}

