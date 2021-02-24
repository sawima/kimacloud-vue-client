import Cookies from 'js-cookie'

const TokenKey = 'kimacloud_management_access_token'
const LoginUserKey = 'Kimacloud_Signage_Client_key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, `Bearer ${token}`)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getInfo() {
  return JSON.parse(localStorage.getItem(LoginUserKey))
}

export function logout() {
  return localStorage.removeItem(LoginUserKey)
}

export function setLoginUser(userData) {
  return localStorage.setItem(LoginUserKey, JSON.stringify(userData))
}
