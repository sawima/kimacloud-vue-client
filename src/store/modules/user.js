import { userPWDLogin, userSMSLogin, logout, setLoginUser, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  }
}

const actions = {
  // user login
  passLogin({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      userPWDLogin({ mobile: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', data.user.Context.nickName)
        setToken(data.token)
        setLoginUser(data.user.Context.nickName)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  smsLogin({ commit }, userInfo) {
    console.log(userInfo)
    const { mobile, smsCode } = userInfo
    return new Promise((resolve, reject) => {
      userSMSLogin({ mobile: mobile.trim(), verifyCode: smsCode }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', data.user.Context.nickName)
        setToken(data.token)
        setLoginUser(data.user.Context.nickName)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    console.log('request user info')
    return new Promise((resolve, reject) => {
      const userName = getInfo()
      if (userName) {
        commit('SET_NAME', userName)
        resolve(userName)
      } else {
        reject()
      }
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve) => {
      logout()
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

