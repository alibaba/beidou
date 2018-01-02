const db = require('../db');

const symbol = Symbol('beidou#context#db');

module.exports = {
  get db() {
    if (!this[symbol]) {
      this[symbol] = db;
    }
    return this[symbol];
  },
};
