const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const stylus = require('gulp-stylus')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const data = require('gulp-data')
const stream = require('merge-stream')
const path = require('path')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const server = require('gulp-server-livereload')

function requireUncached($module) {
    delete require.cache[require.resolve($module)]
    return require($module)
}


// SERVE

const SERVER_OPTIONS = {
    livereload: true,
    open: true,
    port: 8000
}

const SOURCE_DIRECTORY = 'src'

gulp.task('serve', () => {
    gulp.src(SOURCE_DIRECTORY)
        .pipe(server(SERVER_OPTIONS))
})


// STYLUS

const STYL_INPUT = 'src/styles/index.styl'
const STYL_OUTPUT = 'src/styles/'

gulp.task('styl', () => {
	return gulp
		.src(STYL_INPUT)
		.pipe(stylus())
		.pipe(autoprefixer())
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(STYL_OUTPUT))
})


// JS

const JS_INPUT = ["src/scripts/*.js", "!src/scripts/*min.js"]
const JS_OUTPUT = "src/scripts/"

gulp.task('js', () => {
	return gulp
		.src(JS_INPUT)
		.pipe(babel({presets: ['es2015']}))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(JS_OUTPUT))
});


// WATCH

const logEvent = (event) => {
	console.log(`File ${path.relative(__dirname, event.path)} was ${event.type}, running tasks...`)
}

gulp.task('watch', () => {
	gulp.watch(STYL_INPUT, ['styl']).on('change', logEvent)
	gulp.watch(JS_INPUT, ['js']).on('change', logEvent)
})


// DEFAULT
gulp.task('build', ['styl', 'js'])
gulp.task('default', ['styl', 'js', 'serve', 'watch'])
