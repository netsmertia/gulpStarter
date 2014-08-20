var gulp = require('gulp');

var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');




//start the server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './dist'
        }
    });
});


//copy tasks
gulp.task('copy:fonts', function() {
    return gulp.src(['bower_components/semantic-ui-sass/app/assets/fonts/semantic-ui/*'])
            .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('copy:js', function() {
    return gulp.src(['bower_components/semantic-ui-sass/app/assets/javascripts/semantic-ui/**/*',
                    'bower_components/jquery/dist/*.min.js'
                    ])
            .pipe(gulp.dest('dist/js/'));
});

gulp.task('style', function() {

    return gulp.src('src/scss/*.scss')
            .pipe(sass({ 
                includePaths: ['bower_components/semantic-ui-sass/app/assets/stylesheets']
            }))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(gulp.dest('dist/css'))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest('dist/css'))
            .pipe(browserSync.reload({stream: true}));
});


gulp.task('default', ['style', 'browser-sync'], function() {
            gulp.watch("src/scss/{,*/}*.scss", ['sass']);
            gulp.watch("dist/**/*.html", browserSync.reload);
});
