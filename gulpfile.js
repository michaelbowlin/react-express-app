var gulp = require('gulp');
// LiveServer restarts the server upon save and automate server in gulpfile
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');

gulp.task('live-server', function () {
    var server = new LiveServer('server/main.js');
    server.start();
});

// Dependent upon our live-server task
gulp.task('serve', ['live-server'], function () {
    browserSync.init(null, { // null means server already going
        proxy: "http://localhost:7777",
        port: 9001
    })
});