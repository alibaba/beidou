'use strict';

module.exports = {
  keys: 'secret',

  isomorphic: {
    babel: {
      plugins: [
        require.resolve('babel-plugin-dynamic-import-node'),
        [require.resolve('babel-plugin-import-inspector'), {
          serverSideRequirePath: true,
        }],
      ],
    },
  },
};
