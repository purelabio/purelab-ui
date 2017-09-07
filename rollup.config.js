'use strict'

const external = ['react', 'react-dom', 'emerge', 'fpx']

module.exports = [
  {
    input: 'lib/scripts/index.js',
    output: {file: 'es/purelab-ui.js', format: 'es'},
    external,
    plugins: [
      require('rollup-plugin-babel')({exclude: 'node_modules/**'}),
    ],
  },
  {
    input: 'es/purelab-ui.js',
    output: {file: 'dist/purelab-ui.js', format: 'cjs'},
    external,
  },
  // For evaluating minified size
  {
    input: 'dist/purelab-ui.js',
    output: {file: 'dist/purelab-ui.min.js', format: 'cjs'},
    external,
    plugins: [
      require('rollup-plugin-uglify')({
        mangle: true,
        toplevel: true,
        compress: true,
      }),
    ],
  },
]
