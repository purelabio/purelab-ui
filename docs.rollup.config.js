'use strict'

const PROD = process.env.NODE_ENV === 'production'

module.exports = {
  input: 'src/scripts/main.js',
  output: {file: 'dist/scripts/main.js', format: 'iife'},
  plugins: [
    require('rollup-plugin-babel')({exclude: 'node_modules/**'}),
    require('rollup-plugin-commonjs')({namedExports: {
      react: ['createElement', 'Component'],
      'react-dom': ['render', 'findDOMNode', 'unmountComponentAtNode'],
    }}),
    require('rollup-plugin-node-resolve')({browser: true}),
    require('rollup-plugin-alias')({'purelab-ui': require.resolve('./lib/scripts')}),
    ...(!PROD ? [] : [
      require('rollup-plugin-uglify')({
        mangle: true,
        toplevel: true,
        compress: true,
      }),
    ]),
  ],
}
