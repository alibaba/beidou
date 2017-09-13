/**
 * iosmorphic render
 *
 * in client side, run `ReactDOM.render`
 *
 * in server side, inject render info to `Componet[Symbol.for('ReactView#view')]`
 */
module.exports = (typeof __CLIENT__ !== 'undefined' && __CLIENT__ === true) ? require('./client-render') : require('./server-render');
