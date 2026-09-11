function readLocalStorage(key: string) {
  var local = localStorage.getItem(key);
  if (local == null) return null;
  return JSON.parse(key);
}

function setLocalStorage(key: string, value: object) {
  var parse = JSON.stringify(value);
  localStorage.setItem(key, parse);
}

function clearLocalStorage(key: string) {
  localStorage.removeItem(key);
}
