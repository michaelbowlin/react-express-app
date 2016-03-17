var gulp = require('gulp');
// LiveServer restarts the server upon save and automate server in gulpfile
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');
var browserify = require('browserify');
// vinyl-source-stream --> takes a data format that can be used by gulp and turns it into
// a format that can be used by a static server like express
var source = require('vinyl-source-stream');
var reactify = require('reactify');
//ES6 additions (http://weblogs.asp.net/dwahlin/getting-started-with-es6-%E2%80%93-transpiling-es6-to-es5)
var traceur = require('gulp-traceur');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var es6Path = 'app/es6/*.js';
var compilePath = 'dist/compiled-es6';
// From Portal1.0
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var cssnano = require('gulp-cssnano');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var autoprefixer = require('autoprefixer');

gulp.task('live-server', function () {
    var server = new LiveServer('server/main.js');
    server.start();
});

// Browerify grabs app/main.jsx and any files that it requires
// turns all that info from jsx to JS (using the reactify transform)
// Bundle wraps up the transformations and tells browserify we're ready
gulp.task('bundle', ['copy'], function () {
    return browserify({
        //starting point
        entries: 'app/main.jsx',
        debug: true,

    })
        .transform(reactify)
        .bundle()
        .pipe(source('app.js'))
        // send this new stuff to a temp dir
        .pipe(gulp.dest('./.tmp'));
});

gulp.task('copy', function () {
    gulp.src(['app/*.css'])
    .pipe(gulp.dest('./.tmp'));
});

// This adds the plumber module into the streaming process to handle any errors that occur in the the piping process more gracefully
// and then invokes the Traceur transpiler. The blockBinding property allows block level definitions to be used in the
// ES6 code via a new let keyword
gulp.task('traceur', function () {
    gulp.src([es6Path])
        .pipe(plumber())
        .pipe(traceur({ blockBinding: true }))
        .pipe(gulp.dest(compilePath + '/traceur'));
});

// cause ES6 to be transpiled to ES5 (using two different techniques) but they won’t run any time an ES6 file is saved
gulp.task('babel', function () {
    gulp.src([es6Path])
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest(compilePath + '/babel'));
});

// Automation
gulp.task('watch', function() {
    gulp.watch([es6Path], ['traceur', 'babel']);
});

// Dependent upon our live-server and bundle task
gulp.task('serve', ['bundle', 'live-server','traceur', 'babel', 'watch'], function () {
    browserSync.init(null, { // null means server already going
        proxy: "http://localhost:7777",
        port: 9001
    })
});