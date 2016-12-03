var gulp = require('gulp');
var browserSync = require('browser-sync');
var less = require('gulp-less');
var path = require('path');
var uglify = require('gulp-uglifyjs');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var cleancss = new LessPluginCleanCSS({ advanced: true });
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

gulp.task('browserSync', function() {
  browserSync.init({
    port: '8080',
    proxy: "localhost"
     
  });

  gulp.watch('./src/less/**/*.less', ['less']);
  //gulp.watch("./index.html").on('change', browserSync.reload);
})

gulp.task('uglify', function() {
  gulp.src('./src/js/*.js')
    .pipe(uglify('scripts.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('./public_html/wp-content/themes/mbl_/js'))
});

gulp.task('less', function () {
  return gulp.src('./src/less/**/styles.less')
    .pipe(less().on('error', function (err) {
      console.log(err);
    }))
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ],
      plugins: [cleancss]
    }))
    .pipe(sourcemaps.write('maps/'))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./public_html/wp-content/themes/mbl_/'))
    .pipe(browserSync.reload({stream:true}))
});
 

gulp.task('default', ['less', 'browserSync' , 'uglify' ]);