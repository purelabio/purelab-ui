'use strict'

const $ = require('gulp-load-plugins')()
const del = require('del')
const gulp = require('gulp')
const {obj: passthrough} = require('through2')
const webpack = require('webpack')
const {fork} = require('child_process')

const webpackConfig = require('./webpack.config')

/**
 * Globals
 */

const docSrc = {
  root: 'docs',
  html: 'docs/html/**/*',
  static: 'docs/static/**/*',
  staticFonts: 'node_modules/mdi/fonts/**/*',
  staticFontsBase: 'node_modules/mdi',
  styleGlobs: [
    'node_modules/stylebox/**/*.scss',
    'docs/styles/**/*.scss',
    'src/styles/**/*.scss',
  ],
  styleEntryFiles: ['docs/styles/main.scss'],
}

const docOut = {
  root: 'gh-pages',
  styles: 'gh-pages/styles',
}

const prod = process.env.NODE_ENV === 'production'

const autoprefixerSettings = {browsers: ['> 1%', 'IE >= 9', 'iOS 7']}

const cssCleanSettings = {
  keepSpecialComments: 0,
  aggressiveMerging: false,
  advanced: false,
  // Don't inline `@import: url()`
  processImport: false,
}

const Err = (key, msg) => new $.util.PluginError(key, msg, {showProperties: false})

/**
 * Clear
 */

gulp.task('docs:clear', () => (
  del(docOut.root).catch(console.error.bind(console))
))

/**
 * Static
 */

gulp.task('docs:static:copy', () => (
  gulp.src(docSrc.static)
    .pipe(gulp.src(docSrc.staticFonts, {base: docSrc.staticFontsBase, passthrough: true}))
    .pipe(gulp.dest(docOut.root))
))

gulp.task('docs:static:watch', () => {
  $.watch(docSrc.static, gulp.series('docs:static:copy'))
  $.watch(docSrc.staticFonts, gulp.series('docs:static:copy'))
})

/**
 * HTML
 */

gulp.task('docs:html:build', () => (
  gulp.src(docSrc.html)
    .pipe(gulp.dest(docOut.root))
))

gulp.task('docs:html:watch', () => {
  $.watch(docSrc.html, gulp.series('docs:html:build'))
})

/**
 * Scripts
 */

gulp.task('docs:scripts:build', done => {
  buildWithWebpack(webpackConfig, done)
})

function buildWithWebpack (config, done) {
  return webpack(config, (err, stats) => {
    if (err) {
      done(Err('webpack', err))
    }
    else {
      $.util.log('[webpack]', stats.toString(config.stats))
      done(stats.hasErrors() ? Err('webpack', 'plugin error') : null)
    }
  })
}

/**
 * Styles
 */

gulp.task('docs:styles:build', () => (
  gulp.src(docSrc.styleEntryFiles)
    .pipe($.sass({includePaths: [docSrc.root]}))
    .pipe($.autoprefixer(autoprefixerSettings))
    .pipe(!prod ? passthrough() : $.cleanCss(cssCleanSettings))
    .pipe(gulp.dest(docOut.styles))
))

gulp.task('docs:styles:watch', () => {
  $.watch(docSrc.styleGlobs, gulp.series('docs:styles:build'))
})

/**
 * Devserver + Scripts
 */

gulp.task('docs:devserver', () => {
  let proc

  process.on('exit', () => {
    if (proc) proc.kill()
  })

  function restart() {
    if (proc) proc.kill()
    proc = fork('./devserver')
  }

  restart()
  $.watch(['./webpack.config.js', './devserver.js'], restart)
})

/**
 * Default
 */

gulp.task('buildup', gulp.parallel(
  'docs:static:copy',
  'docs:html:build',
  'docs:styles:build'
))

gulp.task('watch', gulp.parallel(
  'docs:static:watch',
  'docs:html:watch',
  'docs:styles:watch',
  'docs:devserver'
))

gulp.task('build', gulp.series('docs:clear', gulp.parallel('buildup', 'docs:scripts:build')))

gulp.task('default', gulp.series('docs:clear', gulp.series('buildup', 'watch')))
