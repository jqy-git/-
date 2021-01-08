//token
export function getToken() {
  return localStorage.getItem('token')
}

export function setToken(token) {
  localStorage.setItem('token', token)
}

export function removeToken() {
  localStorage.removeItem('token')
}

export function isLogined() {
  if (localStorage.getItem('token')) {
    return true
  }
  return false
}

//用户名、密码、记住登录
export function getUser() {
  return {
    username: localStorage.getItem('username'),
    password: localStorage.getItem('password'),
    remember: localStorage.getItem('remember')
  }
}

export function setUser(username, password, remember) {
  localStorage.setItem('username', username)
  localStorage.setItem('password', password)
  localStorage.setItem('remember', remember)
}

export function removeUser() {
  return {
    username: localStorage.removeItem('username'),
    password: localStorage.removeItem('password'),
    remember: localStorage.removeItem('remember')
  }
}