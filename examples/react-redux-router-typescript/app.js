require('@babel/register')({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    ['@babel/preset-stage-2', { decoratorsLegacy: true }],
    '@babel/react',
    '@babel/typescript',
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
  ],
  babelrc: false,
  extensions: ['.jsx', '.mjs', '.ts', '.tsx'],
  cache: false,
});
