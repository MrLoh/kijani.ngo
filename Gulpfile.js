const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const stylus = require('gulp-stylus')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const data = require('gulp-data')
const stream = require('merge-stream')
const path = require('path')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel');

function requireUncached($module) {
    delete require.cache[require.resolve($module)]
    return require($module)
}


// STYLUS

const stylInput = 'src/styles/*.styl'
const stylOutput = 'src/styles/'

gulp.task('styl', () => {
	return gulp
		.src(stylInput)
		.pipe(stylus())
		.pipe(autoprefixer())
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(stylOutput))
})


// JS

const jsInput = ["src/scripts/*.js", "!src/scripts/*min.js"]
const jsOutput = "src/scripts/"

gulp.task('js', () => {
	return gulp
		.src(jsInput)
		.pipe(babel({presets: ['es2015']}))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(jsOutput))
});


// WATCH

const logEvent = (event) => {
	console.log(`File ${path.relative(__dirname, event.path)} was ${event.type}, running tasks...`)
}

gulp.task('watch', () => {
	gulp.watch(stylInput, ['styl']).on('change', logEvent)
	gulp.watch(jsInput, ['js']).on('change', logEvent)
})


// DEFAULT

gulp.task('default', ['styl', 'js', 'watch'])
