const USERID = 'userid';

export function setUserId(id?: string) {
  if (id !== undefined) {
    localStorage.setItem(USERID, id);
  } else {
    localStorage.removeItem(USERID);
  }
}

export function getUserId() {
  return localStorage.getItem(USERID);
}
