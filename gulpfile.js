const {watch, series, task, src, dest, parallel} = require("gulp")
const pug = require("gulp-pug")
const sass = require('gulp-sass')(require('sass'))
const plumber = require("gulp-plumber")
const autoprefixer = require("gulp-autoprefixer")
const browserSync = require("browser-sync")
const browserify = require("browserify")
const babelify = require("babelify")
const source = require("vinyl-source-stream")

function error(err) {
    console.error(err.messageFormatted)
    this.emit('end')
}

task("pug", () => {
    return src("src/*.pug")
        .pipe(plumber({ errorHandler: error }))
        .pipe(pug())
        .pipe(dest("dist"))
})

task("sass", () => {
    return src("src/*.sass")
        .pipe(plumber({ errorHandler: error }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest("dist"))
})

task("babel", () => {
    return browserify("src/main.js", { debug: true })
        .transform(babelify, {presets: ['@babel/preset-env']})
        .bundle()
        .pipe(plumber({ errorHandler: error }))
        .pipe(source("bundle.js"))
        .pipe(dest("dist"))
})

task("server", () => {
    browserSync({
        server: {
            baseDir: "./dist/"
        }
    })
})

task("reload", (done) => {
    browserSync.reload()
    done()
})

task("src", () => {
    watch("src/*.js", series("babel"))
    watch("src/*.sass", series("sass"))
    watch("src/*.pug", series("pug"))
})

task("dist", () => {
    watch("dist/*.js", series("reload"))
    watch("dist/*.css", series("reload"))
    watch("dist/*.html", series("reload"))
})

task("default", series("babel", "sass", "pug", parallel("src", "dist", "server")))
