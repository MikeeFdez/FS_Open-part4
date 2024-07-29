module.exports = {
  'env': {
      'commonjs': true,
      'es2021': true,
      'node': true
  },
  'overrides': [
      {
          'env': {
              'node': true
          },
          'files': [
              '.eslintrc.{js,cjs}'
          ],
          'parserOptions': {
              'sourceType': 'script'
          }
      }
  ],
  'parserOptions': {
      'ecmaVersion': 'latest'
  },
  plugins: [
      '@stylistic/js'
  ],
  'extends': 'eslint:recommended',
  'rules': {
      '@stylistic/js/indent': [
          'error',
          2
      ],
      '@stylistic/js/linebreak-style': [
          'error',
          'unix'
      ],
      '@stylistic/js/quotes': [
          'error',
          'single'
      ],
      '@stylistic/js/semi': [
          'error',
          'never'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
          'error', 'always'
      ],
      'arrow-spacing': [
          'error', { 'before': true, 'after': true }
      ],
      'no-console': 0,
  }
}


// module.exports = {
//   root: true,
//   env: { browser: true, es2020: true },
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:react/jsx-runtime',
//     'plugin:react-hooks/recommended',
//   ],
//   ignorePatterns: ['dist', '.eslintrc.cjs'],
//   parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
//   settings: { react: { version: '18.2' } },
//   plugins: ['react-refresh'],
//   rules: {
//     'react/jsx-no-target-blank': 'off',
//     'react-refresh/only-export-components': [
//       'warn',
//       { allowConstantExport: true },
//     ],
//     'react/prop-types': 0
//   },
// }
