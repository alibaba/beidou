module.exports = {
    "extends": "eslint-config-beidou",
    "plugins": [
      "react",
    ],
    "parserOptions": {
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "rules": {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/forbid-prop-types": [1, { "forbid": [ "any" ] }],
      'react/prefer-stateless-function': 0,
      "no-template-curly-in-string": 0,
      "react/no-danger": 0,
      "require-yield": 0,
      "no-plusplus": 0,
      "react/jsx-filename-extension": 0,
      "react/prefer-es6-class": 0,
      "react/no-did-mount-set-state": 0
    },
    "globals": {
      "__ENV__": true,
      "__CLIENT__": true,
      "__SERVER__": true
    }
};
