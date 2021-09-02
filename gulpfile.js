const gulp = require("gulp")
const pug = require("gulp-pug")
const sass = require('gulp-sass')(require('sass'))
const babel = require("gulp-babel")
const plumber = require("gulp-plumber")
const autoprefixer = require("gulp-autoprefixer")
const browserSync = require("browser-sync")

gulp.task("pug", () => {
    return gulp.src("src/*.pug")
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest("dist"))
});

gulp.task("sass", () => {
    return gulp.src("src/*.sass")
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("dist"))
})

gulp.task("babel", () => {
    return gulp.src("src/*.es6")
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(gulp.dest("dist"))
})

gulp.task("update", () => {
    gulp.series("babel")
    gulp.series("sass")
    gulp.series("pug")
})

gulp.task("browser-sync", () => {
    browserSync({
        server: {
            baseDir: "./dist/"
        }
    })

    gulp.series("update")

    gulp.watch("dist/*.js", gulp.series("reload"))
    gulp.watch("dist/*.css", gulp.series("reload"))
    gulp.watch("dist/*.html", gulp.series("reload"))
})

gulp.task("reload", () => {
    browserSync.reload();
});

gulp.task("watch", () => {
    gulp.watch("src/*.es6", gulp.series("babel"));
    gulp.watch("src/*.sass", gulp.series("sass"));
    gulp.watch("src/*.pug", gulp.series("pug"));
});

gulp.task("default", gulp.parallel("browser-sync", "watch"));
