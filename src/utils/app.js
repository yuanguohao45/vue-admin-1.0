import Cookie from 'cookie_js'

const adminToken = 'admin_token'
const adminUserName = 'admin_username'

export function getToken() {
  return Cookie.get(adminToken)
}

export function setToken(token) {
  return Cookie.set(adminToken, token)
}
export function removeToken() {
  return Cookie.remove(adminToken)
}

export function getUserName() {
  return Cookie.get(adminUserName)
}
export function setUserName(name) {
  return Cookie.set(adminUserName, name)
}
export function removeUserName() {
  return Cookie.remove(adminUserName)
}