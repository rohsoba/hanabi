const gulp = require("gulp")
const pug = require("gulp-pug")
const sass = require('gulp-sass')(require('sass'))
const babel = require("gulp-babel")
const plumber = require("gulp-plumber")
const autoprefixer = require("gulp-autoprefixer")
const browserSync = require("browser-sync")

const { watch, series, task, src, dest, parallel } = require("gulp");

task("pug", () => {
    return src("src/*.pug")
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(dest("dist"))
});

task("sass", () => {
    return src("src/*.sass")
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest("dist"))
})

task("babel", () => {
    return src("src/*.es6")
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(dest("dist"))
})

task("update", () => {
    series("babel")
    series("sass")
    series("pug")
})

task("browser-sync", () => {
    browserSync({
        server: {
            baseDir: "./dist/"
        }
    })

    series("update")

    watch("dist/*.js", series("reload"))
    watch("dist/*.css", series("reload"))
    watch("dist/*.html", series("reload"))
})

task("reload", () => {
    browserSync.reload();
});

task("watch", () => {
    watch("src/*.es6", series("babel"));
    watch("src/*.sass", series("sass"));
    watch("src/*.pug", series("pug"));
});

task("default", parallel("browser-sync", "watch"));
