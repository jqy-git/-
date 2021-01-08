export function getIndex(){
  return sessionStorage.getItem('index')
}

export function setIndex(index){
  sessionStorage.setItem('index', index)
}

export function removeIndex(){
 sessionStorage.removeItem('index')
}

export function getDefaultOpenKeys(){
  return sessionStorage.getItem('defaultOpenKeys')
}

export function setDefaultOpenKeys(defaultOpenKeys){
  sessionStorage.setItem('defaultOpenKeys', defaultOpenKeys)
}

export function removeDefaultOpenKeys(){
  sessionStorage.removeItem('defaultOpenKeys')
}