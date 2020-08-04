export function getRandomVal(maxLimit = 10000) {
  let arand = Math.random() * maxLimit;
  return Math.floor(arand);
}

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const withId = id => row => row.id === id;
