var gulp = require('gulp')

var connect = require('gulp-connect')

gulp.task('connect', function() {
	connect.server({
		root: 'src/',
		livereload: true
	});
});
gulp.task('file', function () {
	gulp.src('./src/*.*')
		.pipe(connect.reload());
});
gulp.task('watch', function () {
	gulp.watch([
		'src/style/*.*' ,
		'src/js/*.*' ,
		'src/*.html'
	], ['file']);
});
gulp.task('server', ['connect', 'watch']);