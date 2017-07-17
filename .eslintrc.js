module.exports = {
  "extends": "eslint-config-beidou",
  "parserOptions": {
    "sourceType": "javascript"
  },
  "rules":{
    "strict": ["error", "safe"],
    "import/no-dynamic-require": "off",
    "require-yield": "off",
    "class-methods-use-this": "off"
  }
}
