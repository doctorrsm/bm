import gulp from "gulp";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import { htmlValidator } from 'gulp-w3c-html-validator';
import nunjucks from 'gulp-nunjucks';
import gulpHtmlBemValidator from 'gulp-html-bem-validator';
import beautify from 'gulp-beautify';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import squoosh from 'gulp-libsquoosh';
import rename from 'gulp-rename';
import browser from 'browser-sync';
import gulpStylelint from 'gulp-stylelint';

const {
  src,
  dest,
  series,
  parallel
} = gulp;
const sass = gulpSass(dartSass);

export function validate() {
  return src('./build/*.html')
    .pipe(gulpHtmlBemValidator())
    .pipe(htmlValidator.analyzer())
    .pipe(htmlValidator.reporter());

};

export function stylelint() {
  return src('./source/sass/**/*.scss')
  .pipe(gulpStylelint({
    reporters: [
      {formatter: 'string', console: true}
    ]
  }));
}

export function css() {
  return src('./source/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('./dist/css'));
}

export function njk() {
  return src('./source/*.html')
    .pipe(nunjucks.compile())
    .pipe(dest('./build/'));
}
export function beauty() {
  return src('./source/*.html')
    .pipe(beautify.html({
      indent_size: 2
    }));
}

export function img() {
  return src('./source/img/**/*.{jpg,png}')
    .pipe(squoosh({
      //webp: {},
      //avif: {},
    }))
    .pipe(dest('./build/img'));
}

export function webp() {
  return src('./source/img/**/*.{jpg,png}')
    .pipe(squoosh({
      webp: {},
      avif: {},
    }))
    .pipe(dest('./build/img'));
}
export function svg() {
  return src('./source/img/svg-sprite/*.svg')
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(dest('./build/img/svg/'));
}

export function svgcopy() {
  return src('./source/img/svg/*.svg')
    .pipe(svgo())
    .pipe(dest('./build/img/svg/'));
}

export function js() {
  return src('./source/js/*.js')
    .pipe(dest('./build/js/'));
}

export function watch() {
  gulp.watch('./source/**/*.html', series(njk, reload));
  gulp.watch('./source/sass/**/*.scss', series(css, reload));
  gulp.watch('./source/js/*.js', js);
  gulp.watch('./source/**/*.svg', series(svg, svgcopy));
  gulp.watch('./source/**/*.{jpg,png}', series(img, webp));
}

export function watchcss() {
  gulp.watch('./source/sass/**/*.scss', css);
}


export function validatehtml() {
  return src('./build/*.html')
    .pipe(htmlValidator.analyzer())
    .pipe(htmlValidator.reporter());
}

const reload = (done) => {
  browser.reload();
  done();
}

export function server(done) {
  browser.init({
    server: {
      baseDir: 'dist'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

export default gulp.series(
  parallel(
    njk,
    css,
    svg,
    svgcopy,
    js
  ),
  gulp.series(
    server,
    watch
  ));
