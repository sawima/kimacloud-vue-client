import { userPWDLogin, userSMSLogin, logout, setLoginUser, getInfo, getFullUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userContext: {},
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
  SET_USER: (state, userData) => {
    state.userContext = userData
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
        commit('SET_USER', data.user.Context)
        commit('SET_NAME', data.user.Context.nickName)
        setToken(data.token)
        setLoginUser(JSON.stringify(data.user.Context))
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  smsLogin({ commit }, userInfo) {
    const { mobile, smsCode } = userInfo
    return new Promise((resolve, reject) => {
      userSMSLogin({ mobile: mobile.trim(), verifyCode: smsCode }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_USER', data.user.Context)
        commit('SET_NAME', data.user.Context.nickName)
        setToken(data.token)
        setLoginUser(data.user.Context.userID)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getUserInfo({ commit, state }) {
    console.log('request user info')
    return new Promise((resolve, reject) => {
      const userInfo = getInfo()
      if (userInfo) {
        commit('SET_USER', userInfo)
        commit('SET_NAME', userInfo.nickName)
        resolve(userInfo)
      } else {
        reject()
      }
    })
  },

  refreshUserInfo({ commit }) {
    console.log('refresh user info')
    return new Promise((resolve, reject) => {
      getFullUserInfo().then(response => {
        const { data } = response
        commit('SET_USER', data.Item)
        commit('SET_NAME', data.Item.nickName)
        setLoginUser(data.Item.userID)
        resolve()
      }).catch(error => {
        reject(error)
      })
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

