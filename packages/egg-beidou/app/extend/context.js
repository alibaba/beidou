module.exports = {
  beidou(...args) {
    this.type = 'html';
    return this.app.beidou.render(this, ...args);
  },
};
