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
  reward_result: []
})

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('users', usersRef)
    bindFirestoreRef('todos', todosRef)
    bindFirestoreRef('rewards', rewardsRef)
    bindFirestoreRef('chore_result', choreResultRef.orderBy('done', 'desc'))
    bindFirestoreRef('reward_result', rewardResultRef.orderBy('done', 'desc'))
  }),
  // Choreに関して
  addChore: firestoreAction((context, title) => {
    if (title.trim()) {
      todosRef.add({
        title: title,
        mode: true,
        point: 5,
        imgSrc: `/chore/img${Math.floor(Math.random() * 12) + 1}.png`
      })
    }
  }),
  removeChore: firestoreAction((context, id) => {
    todosRef.doc(id).delete()
  }),
  editChoreTitle: firestoreAction((context, todo) => {
    todosRef.doc(todo.id).update({
      title: todo.title
    }).then(() => {
      context.commit('isTodosModeChange', todo)
    })
  }),
  incrementChorePoint: firestoreAction((context, todo) => {
    if (todo.point < 99) {
      todosRef.doc(todo.id).update({
        point: (todo.point + 1)
      })
    }
  }),
  decrementChorePoint: firestoreAction((context, todo) => {
    if (todo.point >= 1) {
      todosRef.doc(todo.id).update({
        point: (todo.point - 1)
      })
    }
  }),
  changeImgSrc: firestoreAction((context, todo) => {
    const image_src_num = Number(todo.imgSrc.replace(/[^0-9]/g, ''))

    if (image_src_num === 12) {
      todosRef.doc(todo.id).update({
        imgSrc: `/chore/img1.png`
      })
    } else {
      todosRef.doc(todo.id).update({
        imgSrc: `/chore/img${image_src_num + 1}.png`
      })
    }
  }),
  // usersに関して
  addUsersPoints: firestoreAction((context, point) => {
    const nowPoints = context.state.users[0].points
    usersRef.doc('chorepoints').update({
      points: nowPoints + point
    })
  }),
  subUsersPoints: firestoreAction((context, point) => {
    const nowPoints = context.state.users[0].points
    if (point < nowPoints) {
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
      context.commit('isRewardsModeChange', reward)
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
  })
}

export const mutations = {
  isTodosModeChange(context, todo) {
    context.todos.forEach(context_todo => {
      if (context_todo.id === todo.id) {
        context_todo.mode = !context_todo.mode
      }
    })
  },
  isRewardsModeChange(context, reward) {
    context.rewards.forEach(context_reward => {
      if (context_reward.id === reward.id) {
        context_reward.mode = !context_reward.mode
      }
    })
  }
}
