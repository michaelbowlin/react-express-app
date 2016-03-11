var gulp = require('gulp');
// LiveServer restarts the server upon save and automate server in gulpfile
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');
var browserify = require('browserify');
// vinyl-source-stream --> takes a data format that can be used by gulp and turns it into
// a format that can be used by a static server like express
var source = require('vinyl-source-stream');
var reactify = require('reactify');


gulp.task('live-server', function () {
    var server = new LiveServer('server/main.js');
    server.start();
});

// Browerify grabs app/main.jsx and any files that it requires
// turns all that info from jsx to JS (using the reactify transform)
// Bundle wraps up the transformations and tells browserify we're ready
gulp.task('bundle', function () {
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

// Dependent upon our live-server task
gulp.task('serve', ['live-server'], function () {
    browserSync.init(null, { // null means server already going
        proxy: "http://localhost:7777",
        port: 9001
    })
});

