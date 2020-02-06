const gulp = require('gulp'),
	terser = require('gulp-terser'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	eslint = require('gulp-eslint'),
	cssnano = require('gulp-cssnano'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('script', function() {
	return gulp
		.src('./js/*.js') // What files do we want gulp to consume?
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(terser()) // Call the terser function on these files
		.pipe(rename({ extname: '.min.js' })) // Rename the uglified file
		.pipe(gulp.dest('./build/js')); // Where do we put the result?
});

gulp.task('scss', function() {
	return gulp
		.src('./scss/style.scss') // What files do we want gulp to consume?
		.pipe(sass()) // Call the scss function on these files
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ extname: '.min.css' })) // Rename the scss file
		.pipe(gulp.dest('./build/css')); // Where do we put the result?
});

gulp.task('reload', function(done) {
	browserSync.reload();
	done();
});

gulp.task('watch', function() {
	browserSync.init({
		server: './'
	});
	gulp.watch('./js/*.js', gulp.series('script', 'reload'));
	gulp.watch('./scss/*.scss', gulp.series('scss', 'reload'));
	gulp.watch('./index.html', gulp.series('reload'));
});

gulp.task('default', gulp.series('script', 'scss', 'watch', 'reload'));
