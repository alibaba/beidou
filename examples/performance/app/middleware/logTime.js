module.exports = () =>
  function* (next) {
    if (global && typeof global.__reqIndex === 'number') {
      global.__reqIndex += 1;
    } else {
      global.__reqIndex = 1;
      global.__totleRenderTime = 0;
    }
    const st = Date.now();
    yield next;
    global.__totleRenderTime += Date.now() - st;
    console.log(
      `The average rendering time for ${global.__reqIndex} requests is:`,
      (global.__totleRenderTime / global.__reqIndex).toFixed(2),
      'ms'
    );
  };
