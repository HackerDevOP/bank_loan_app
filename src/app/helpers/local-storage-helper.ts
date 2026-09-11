export function readLocalStorage(key: string) {
  try {
    const local = localStorage.getItem(key);
    return local ? (JSON.parse(local)) : null;
  } catch (error) {
    console.error(`Error reading key ${key} from local storage`, error);
    return null;
  }
}

export function setLocalStorage(key: string, value: object) {
  var parse = JSON.stringify(value);
  localStorage.setItem(key, parse);
}

export function clearLocalStorage(key: string) {
  localStorage.removeItem(key);
}
