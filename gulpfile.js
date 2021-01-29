const gulp = require("gulp");
const babel = require("gulp-babel");
const plumber = require("gulp-plumber");
const minify = require("gulp-minify");
const concat = require("gulp-concat");

gulp.task("build", function () {
  return gulp
    .src("./src/**/*.js")
    .pipe(plumber())
    .pipe(
      babel({
        presets: [
          [
            "@babel/env",
            {
              modules: false,
            },
          ],
        ],
      })
    )
    .pipe(gulp.dest("./dist"));
});

gulp.task("compress", function () {
  return gulp
    .src("./dist/**/*.js")
    .pipe(plumber())
    .pipe(concat("bundle.js"))
    .pipe(
      minify({
        ext: {
          src: ".js",
          min: ".min.js",
        },
      })
    )

    .pipe(gulp.dest("./dist"));
});

gulp.task("es6", function () {
  return gulp
    .src("./src/**/*.js")
    .pipe(plumber())
    .pipe(concat("bundle.es6.js"))
    .pipe(
      minify({
        ext: {
          src: ".js",
          min: ".min.js",
        },
      })
    )

    .pipe(gulp.dest("./dist"));
});
