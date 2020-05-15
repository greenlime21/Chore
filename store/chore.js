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
        mode: true,
        // created: firebase.firestore.FieldValue.serverTimestamp(),
        // deadline: firebase.firestore.FieldValue.serverTimestamp(),
        point: 1
      })
    }
  }),
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()
  }),
  editTitle: firestoreAction((context, todo) => {
    todosRef.doc(todo.id).update({
      title: todo.title
    }).then(() => {
      todosRef.doc(todo.id).update({ mode: !todo.mode })
    })
  }),
  incrementPoint: firestoreAction((context, todo) => {
    if (todo.point < 99) {
      todosRef.doc(todo.id).update({
      point: (todo.point + 1)
      })
    }
  }),
  decrementPoint: firestoreAction((context, todo) => {
    if (todo.point >= 1) {
      todosRef.doc(todo.id).update({
      point: (todo.point - 1)
      })
    }
  }),
}