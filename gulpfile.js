"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass")(require("node-sass")), // se requiere node-sass o sass para que funcione gulp-sass
    browserSync = require("browser-sync"),
    del = require("del"),
    imagemin = require("gulp-imagemin"),
    uglify = require("gulp-uglify"),
    usemin = require("gulp-usemin"),
    rev = require("gulp-rev"),
    cleanCss = require("gulp-clean-css"),
    flatmap = require("gulp-flatmap"),
    htmlmin = require("gulp-htmlmin");

gulp.task("sass", function () { // esta función es un Stream de gulp, incluye source, pipes y dest que es donde se guarda el resultado
    return gulp.src("css/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./css"));
});

gulp.task("sass:watch", function () {
    gulp.watch("css/*.scss", ["sass"]);
});

gulp.task("browser-sync", function () {
    var files = ["./*.html", "./css/*.css", "./js/*.js", "./images/*.{png,jpg,gif,jpeg}"];
    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task("default", ["browser-sync"], function () {
    gulp.start("sass:watch");
}); 

gulp.task("clean", function () {
    return del(["dist"]);
});

gulp.task("imagemin", function () {
    return gulp.src("images/*.{png,jpg,gif,jpeg}")
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest("dist/img"));
});

gulp.task("usemin", function () {
    return gulp.src("./*.html")
        .pipe(flatmap(function (stream, file) {
            return stream
                .pipe(usemin({
                    css: [rev()],
                    html: [function () { return htmlmin({ collapseWhitespace: true }) }],
                    js: [uglify(), rev()],
                    inlinejs: [uglify()],
                    inlinecss: [cleanCss(), "concat"]
                }));
        }))
        .pipe(gulp.dest("dist/"));
});

gulp.task("copyfonts", function () {
    gulp.src("./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*")
        .pipe(gulp.dest("./dist/fonts"));
});

gulp.task("build", ["clean"], function () {
    gulp.start("copyfonts", "imagemin", "usemin");
});