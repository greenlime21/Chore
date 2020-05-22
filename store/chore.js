import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const todosRef = db.collection('todos')
const usersRef = db.collection('users')
const rewardsRef = db.collection('rewards')
const choreResultRef = db.collection('chore-result')
const rewardResultRef = db.collection('reward-result')

export const state = () => ({
  todos: [],
  users: [],
  rewards: [],
  chore_result: [],
  reward_result: [],
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('todos', todosRef)
    bindFirestoreRef('users', usersRef)
    bindFirestoreRef('rewards', rewardsRef)
    bindFirestoreRef('chore_result', choreResultRef.orderBy("done", "desc"))
    bindFirestoreRef('reward_result', rewardResultRef.orderBy("done", "desc"))
  }),
  // Todosに関して
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
  // chore_resultに関して
  addChoreResult: firestoreAction((context, todo) => {
    choreResultRef.add({
      done: todo.done,
      content: todo.title,
      point: todo.point
    })
  }),
  addRewardResult: firestoreAction((context, reward) => {
    rewardResultRef.add({
      done: reward.done,
      content: reward.title,
      point: reward.point
    })
  }),
}