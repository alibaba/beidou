export function uuid() {
  /* jshint bitwise:false */
  let i;
  let random;
  let uid = '';

  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0; // eslint-disable-line
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uid += '-';
    }
    uid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16); // eslint-disable-line
  }

  return uid;
}

export function pluralize(count, word) {
  return count === 1 ? word : `${word}s`;
}
