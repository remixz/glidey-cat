var gulp       = require('gulp');
var gutil      = require('gulp-util');
var browserify = require('gulp-browserify');
var uglify     = require('gulp-uglify');
var connect    = require('gulp-connect')

gulp.task('build', function () {
    return gulp.src('./src/game.js')
               .pipe(browserify())
               .on('error', function (err) {
                    gutil.log(gutil.colors.red('ERROR:'), err.message);
                    gutil.beep();
               })
               .pipe(uglify())
               .pipe(gulp.dest('./public/js'))
               .pipe(connect.reload())
});

gulp.task('connect', connect.server({
    root: __dirname + '/public',
    port: 3000,
    livereload: true
}));

gulp.task('watch', ['connect'], function () {
     gulp.watch('src/**/*.js', ['build']);

     gulp.watch(['public/index.html', 'public/**/*.css'], function (event) {
        gulp.src('public/index.html')
            .pipe(connect.reload());
     });
});

gulp.task('default', ['build']);