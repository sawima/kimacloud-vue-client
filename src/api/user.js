import request from '@/utils/request'
// import Cookies from 'js-cookie'

// const LoginUserKey = 'Kimacloud_Signage_Client_key'

export function getSMSCode(data) {
  return request({
    url: '/getVerifyCode',
    method: 'post',
    data
  })
}

export function userSMSLogin(data) {
  return request({
    url: '/mobileVerifylogin',
    method: 'post',
    data
  })
}

export function userPWDLogin(data) {
  return request({
    url: '/mobilepasswdlogin',
    method: 'post',
    data
  })
}

// export function getInfo() {
//   // return request({
//   //   url: '/vue-admin-template/user/info',
//   //   method: 'get',
//   //   // params: { token }
//   // // })
//   // console.log('get User Info')
//   // const userInfo = Cookies.get(LoginUserKey)
//   // return userInfo ? JSON.parse(userInfo) : {}

//   // return Cookies.get(LoginUserKey)
//   return JSON.parse(localStorage.getItem(LoginUserKey))
// }

// export function logout() {
//   // return request({
//   //   url: '/vue-admin-template/user/logout',
//   //   method: 'post'
//   // })
//   // return Cookies.remove(LoginUserKey)
//   return localStorage.removeItem(LoginUserKey)
// }

// export function setLoginUser(userData) {
//   // return Cookies.set(LoginUserKey, userName)
//   return localStorage.setItem(LoginUserKey, JSON.stringify(userData))
// }

export function changePasswd(newPass) {
  console.log('***')
  console.log(newPass)
  return request({
    url: '/setPassword',
    method: 'post',
    data: newPass
  })
}
export function updateUserProfile(userProfile) {
  return request({
    url: '/updateUserProfile',
    method: 'post',
    data: userProfile
  })
}
export function getFullUserInfo() {
  return request({
    url: '/getFullUserInfo',
    method: 'get'
  })
}
