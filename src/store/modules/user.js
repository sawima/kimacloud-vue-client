import { userPWDLogin, userSMSLogin, getFullUserInfo } from '@/api/user'
import { getToken, setToken, removeToken, logout, setLoginUser, getInfo } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  const userInfo = getInfo()
  if (userInfo) {
    return {
      token: getToken(),
      userContext: userInfo,
      name: userInfo.nickName || '',
      orgs: userInfo.orgs || []
    }
  } else {
    return {
      token: getToken(),
      userContext: {},
      name: '',
      orgs: []
    }
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
  },
  SET_ORGS: (state, orgs) => {
    state.orgs = orgs
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
        setLoginUser(data.user.Context)
        commit('SET_ORGS', data.user.Context.orgs)
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
        commit('SET_ORGS', data.user.Context.orgs)
        setToken(data.token)
        setLoginUser(data.user.Context)
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
      console.log(userInfo)
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
        commit('SET_ORGS', data.Item.orgs)
        setLoginUser(data.Item)
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

