import request from '@/utils/request'
import Cookies from 'js-cookie'

const LoginUserKey= 'kimacloud_User_key'


export function login(data) {
  return request({
    url: '/fetchManagementToken',
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
  console.log("set user name");

  
  return Cookies.set(LoginUserKey,userName)
}