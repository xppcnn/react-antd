export function getLocalStore(name) {
  return localStorage.getItem(name) || '';
}

export function setLocalStore(name,value) {
  return localStorage.setItem(name, value);
}

export function removeLocalStore(name) {
  return localStorage.removeItem(name);
}