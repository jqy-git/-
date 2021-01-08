import { get, post } from '../utils/request'

export function loginApi(user){
  return post('/login', user)
}

export function registerApi(user){
  return post('/register', user)
}

export function getNormalList(){
  return get('/main/normalList')
}

export function editProduct(data){
  return post('/main/normalList/edit', data)
}

export function searchProduct(data){
  return post('/main/normalList/search', data)
}

export function createProduct(data){
  return post("/main/normalList/create", data)
}

export function delProduct(data){
  return post("/delete", data)
}