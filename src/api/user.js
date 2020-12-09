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

export function smslogin(data) {
  return request({
    url: '/mobileVerifylogin',
    method: 'post',
    data
  })
}
export function pwdlogin(data) {
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
  return Cookies.get(LoginUserKey)
}

export function logout() {
  // return request({
  //   url: '/vue-admin-template/user/logout',
  //   method: 'post'
  // })
  return Cookies.remove(LoginUserKey)
}

export function setLoginUser(userName) {
  console.log('set user name')
  return Cookies.set(LoginUserKey, userName)
}
