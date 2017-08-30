'use strict'

const $ = require('gulp-load-plugins')()
const del = require('del')
const gulp = require('gulp')
const {fork} = require('child_process')

/**
 * Globals
 */

const src = {
  root: 'src',
  html: 'src/html/**/*',
  static: 'src/static/**/*',
  staticFonts: 'node_modules/mdi/fonts/**/*',
  staticFontsBase: 'node_modules/mdi',
  styleGlobs: ['src/styles/**/*.scss', 'lib/styles/**/*.scss'],
  styleEntryFiles: ['src/styles/main.scss'],
}

const out = {
  root: 'dist',
  styles: 'dist/styles',
}

/**
 * Clear
 */

gulp.task('clear', () => (
  del(out.root).catch(console.error.bind(console))
))

/**
 * Static
 */

gulp.task('static:copy', () => (
  gulp.src(src.static)
    .pipe(gulp.src(src.staticFonts, {base: src.staticFontsBase, passthrough: true}))
    .pipe(gulp.dest(out.root))
))

gulp.task('static:watch', () => {
  $.watch(src.static, gulp.series('static:copy'))
  $.watch(src.staticFonts, gulp.series('static:copy'))
})

/**
 * HTML
 */

gulp.task('html:build', () => (
  gulp.src(src.html)
    .pipe(gulp.dest(out.root))
))

gulp.task('html:watch', () => {
  $.watch(src.html, gulp.series('html:build'))
})

/**
 * Styles
 */

gulp.task('styles:build', () => (
  gulp.src(src.styleEntryFiles)
    .pipe($.sass({includePaths: [src.root]}))
    .pipe($.autoprefixer())
    .pipe(gulp.dest(out.styles))
))

gulp.task('styles:watch', () => {
  $.watch(src.styleGlobs, gulp.series('styles:build'))
})

/**
 * Devserver + Scripts
 */

gulp.task('devserver', () => {
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
  'static:copy',
  'html:build',
  'styles:build'
))

gulp.task('watch', gulp.parallel(
  'static:watch',
  'html:watch',
  'styles:watch',
  'devserver'
))

gulp.task('default', gulp.series('clear', gulp.series('buildup', 'watch')))
