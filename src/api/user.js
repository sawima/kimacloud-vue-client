import request from '@/utils/request'
import Cookies from 'js-cookie'

const LoginUserKey = 'Kimacloud_Signage_Client_key'

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

export function getInfo() {
  // return request({
  //   url: '/vue-admin-template/user/info',
  //   method: 'get',
  //   // params: { token }
  // })
  console.log('get User Info')
  const userInfo = Cookies.get(LoginUserKey)
  return userInfo ? JSON.parse(userInfo) : {}
}

export function logout() {
  // return request({
  //   url: '/vue-admin-template/user/logout',
  //   method: 'post'
  // })
  return Cookies.remove(LoginUserKey)
}

export function setLoginUser(userName) {
  return Cookies.set(LoginUserKey, userName)
}
