import { src, dest, watch, series, parallel } from 'gulp';
import webpack from 'webpack-stream';
import named from 'vinyl-named';
import eslint from 'gulp-eslint';
import yargs from 'yargs';
let sass = require('gulp-sass')(require('sass'));
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import imagemin from 'gulp-imagemin';
import del from 'del';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import zip from 'gulp-zip';
import info from './package.json';
import replace from 'gulp-replace';
import wpPot from 'gulp-wp-pot';
import sftp from 'gulp-sftp-up4';
const PRODUCTION = yargs.argv.prod;

export const styles = () => {
  return src('src/sass/style.scss')
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(PRODUCTION, postcss([ autoprefixer ])))
    .pipe(gulpif(PRODUCTION, cleanCss({compatability:'*'})))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(dest('dist/css'))
    .pipe(server.stream());
}

export const scripts = () => {
  return src(['src/js/custom/bundle.js', 'src/js/vendor/vendor.js'])
    .pipe(named())
    .pipe(webpack({
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: {
                "presets": [
                  ["@babel/preset-env",
                    {
                      "targets": {
                        "ie": "11"
                      }
                    }
                  ]
                ]
              }
            }
          }
        ]
      },
      mode: PRODUCTION ? 'production' : 'development',
      devtool: !PRODUCTION ? 'inline-source-map' : false,
      output: {
        filename: '[name].js'
      },
      externals: {
        jquery: 'jQuery'
      },
    }))
    .pipe(eslint('eslint-config.json'))
    .pipe(eslint.format())
    .pipe(dest('dist/js'));
}

export const images = () => {
  return src('src/images/**/*.{jpg,jpeg,png,svg,gif}')
    .pipe(gulpif(PRODUCTION, imagemin([
      imagemin.gifsicle(),
      imagemin.mozjpeg(),
      imagemin.optipng(),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false},
          {removeTitle: false}
        ]
      })
    ])))
    .pipe(dest('dist/images'));
}

export const copy = () => {
  return src(['src/**/*','!src/{images,js,sass}','!src/{images,js,sass}/**/*'])
    .pipe(dest('dist'));
}

export const clean = () =>  del(['dist']);

const server = browserSync.create();
export const serve = done => {
  server.init({
    proxy: "http://todo.test"
  });
  done();
};
export const reload = done => {
  server.reload();
  done();
};

export const changelog = () => {
  return src([
    "changelog.html"
  ])
  .pipe(rename(`${info.name}-changelog.html`))
  .pipe(dest('./bundled'))
}

export const compress = () => {
  return src([
    "**/*",
    "!node_modules{,/**}",
    "!bundled{,/**}",
    "!src{,/**}",
    "!.babelrc",
    "!.gitignore",
    "!gulpfile.babel.js",
    "!package.json",
    "!package-lock.json",
    "!eslint-config.json",
    "!.eslintignore",
    "!changelog.html"
  ])
  .pipe(rename( file => {
    file.dirname = `${info.name}/${file.dirname}`;
  }))
  .pipe(replace("_theme_version", info.version))
  .pipe(replace("_themename", info.prefix))
  .pipe(zip(`${info.name}.zip`))
  .pipe(dest('bundled'));
};

export const pot = () => {
  return src('**/*.php')
  .pipe(
    wpPot({
      domain: '_themename',
      package: info.name
    })
  )
  .pipe(dest(`languages/${info.name}.pot`));
}

export const ftp = () => {
  // Do not include credentials directly in public repos
  const conn = sftp({
    host: 'lsupdates.com',
    user: 'lsu_ftp',
    pass: 'LSTh3m3_Updater',
    remotePath: '/var/www/lsupdates.com/api/update/packages'
  });

  return src([
    `bundled/${info.name}.zip`,
    `bundled/${info.name}-changelog.html`
  ], {base: "bundled"})
  .pipe(conn)
}

export const watchForChanges = () => {
  watch('src/sass/**/*.scss', styles);
  watch('src/images/**/*.{jpg,jpeg,png,svg,gif}', series(images, reload));
  watch(['src/**/*','!src/{images,js,sass}','!src/{images,js,sass}/**/*'], series(copy, reload));
  watch('src/js/**/*.js', series(scripts, reload));
  watch('**/*.php', reload);
}

export const dev = series(clean, parallel(styles, images, copy, scripts), serve, watchForChanges)
export const build = series(clean, parallel(styles, images, copy, scripts), pot, changelog, compress)
export const deploy = series(clean, parallel(styles, images, copy, scripts), pot, changelog, compress, ftp)
export default dev;