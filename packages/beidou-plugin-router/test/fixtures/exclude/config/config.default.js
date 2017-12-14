
module.exports = function () {
  const exports = {};
  exports.router = {
    exclude: /^.+-.+$/i,
  }
  return exports;
};
