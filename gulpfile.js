import autoprefixer from 'autoprefixer';
import bemlinter from 'gulp-html-bemlinter';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import htmlmin from 'gulp-htmlmin';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-dart-sass';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import svgoConfig from './svgo.config.js';
import { stacksvg } from 'gulp-stacksvg';
import terser from 'gulp-terser';
import { deleteAsync } from 'del';
import { htmlValidator } from 'gulp-w3c-html-validator';

let isDev = true;

function processMarkup() {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

function lintBem() {
  return gulp.src('source/*.html')
    .pipe(bemlinter());
}

function validateMarkup() {
  return gulp.src('source/*.html')
    .pipe(htmlValidator.analyzer())
    .pipe(htmlValidator.reporter({ throwErrors: true }));
}

function processStyles() {
  return gulp.src('source/sass/*.scss', { sourcemaps: isDev })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

function processScripts() {
  return gulp.src('source/js/**/*.js')
    .pipe(gulpIf(!isDev, terser()))
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

function optimizeImages() {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(gulpIf(!isDev, squoosh()))
    .pipe(gulp.dest('build/img'));
}

function createWebp() {
  return gulp.src(['source/img/**/*.{jpg,png}', '!source/img/favicons/*.{jpg,png}'])
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img'));
}

function optimizeVector() {
  return gulp.src(['source/img/**/*.svg', '!source/img/sprite/*.svg'])
    .pipe(svgo(svgoConfig))
    .pipe(gulp.dest('build/img'));
}

function createSprite() {
  return gulp.src('source/img/sprite/**/*.svg')
    .pipe(svgo(svgoConfig))
    .pipe(stacksvg())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
}

function copyAssets() {
  return gulp.src([
    'source/fonts/**/*.{woff2,woff}',
    'source/*.ico',
    'source/*.webmanifest'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
}

function startServer(done) {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

function reloadServer(done) {
  browser.reload();
  done();
}

function watchFiles() {
  gulp.watch('source/sass/**/*.scss', gulp.series(processStyles));
  gulp.watch('source/js/**/*.js', gulp.series(processScripts));
  gulp.watch('source/*.html', gulp.series(processMarkup, lintBem, validateMarkup, reloadServer));
  gulp.watch('source/img/**/*.{jpg,png,svg}', gulp.series(optimizeImages, createWebp, optimizeVector, reloadServer));
  gulp.watch('source/img/sprite/**/*.svg', gulp.series(createSprite, reloadServer));
}

function compileProject(done) {
  gulp.parallel(
    processMarkup,
    lintBem,
    validateMarkup,
    processStyles,
    processScripts,
    optimizeVector,
    createSprite,
    copyAssets,
    optimizeImages,
    createWebp
  )(done);
}

function deleteBuild() {
  return deleteAsync('build');
}

export function buildProd(done) {
  isDev = false;
  gulp.series(
    deleteBuild,
    compileProject
  )(done);
}

export function runDev(done) {
  gulp.series(
    deleteBuild,
    compileProject,
    startServer,
    watchFiles
  )(done);
}
