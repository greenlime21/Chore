import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const todosRef = db.collection('todos')
const usersRef = db.collection('users')
const rewardsRef = db.collection('rewards')

export const state = () => ({
  todos: [],
  users: [],
  rewards: [],
})

export const actions = {
  // Todosに関して
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('todos', todosRef)
    bindFirestoreRef('users', usersRef)
    bindFirestoreRef('rewards', rewardsRef)
  }),
  add: firestoreAction((context, title) => {
    if (title.trim()) {
      todosRef.add({
        title: title,
        mode: true,
        point: 5
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
  // usersに関して
  addPoints: firestoreAction((context, point) => {
    const nowPoints = context.state.users[0].points
    usersRef.doc('chorepoints').update({
      points: nowPoints + point
    })
  }),
  subPoints: firestoreAction((context, point) => {
    const nowPoints = context.state.users[0].points
    if(point < nowPoints){
      usersRef.doc('chorepoints').update({
        points: nowPoints - point
      })
    }
  }),
  // rewardsに関して
  addReward: firestoreAction((context, title) => {
    if (title.trim()) {
      rewardsRef.add({
        title: title,
        mode: true,
        point: 10
      })
    }
  }),
  removeReward: firestoreAction((context, id) => {
    rewardsRef.doc(id).delete()
  }),
  editRewardTitle: firestoreAction((context, reward) => {
    rewardsRef.doc(reward.id).update({
      title: reward.title
    }).then(() => {
      rewardsRef.doc(reward.id).update({ mode: !reward.mode })
    })
  }),
  incrementRewardPoint: firestoreAction((context, reward) => {
    if (reward.point < 99) {
      rewardsRef.doc(reward.id).update({
      point: (reward.point + 1)
      })
    }
  }),
  decrementRewardPoint: firestoreAction((context, reward) => {
    if (reward.point >= 1) {
      rewardsRef.doc(reward.id).update({
        point: reward.point - 1
      })
    }
  }),
}