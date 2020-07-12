const fs = require('fs');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tsProject = ts.createProject('tsconfig.json');
const replace = require('gulp-replace');

gulp.task('buildTs', () => {
  const files = fs.readdirSync('./src');
  const requireRegular = new RegExp(`(${files.map(f => `require\\(\\"${f}`).join('|')})`, 'g');

  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())

    .pipe(replace(requireRegular, (s) => { // replace require by reqlib
      return 'reqlib("' + s.substring(9)
    }))
    // .pipe(replace('../../../../resources/', '../../../resources/'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('moveSchemes', () => {
  return gulp.src(['**/*.gql', ' **/*.graphql'], { base: './src' })
    .pipe(gulp.dest('dist/'));
})

gulp.task('createPackageJson', (cb) => {
  const package = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  delete package.devDependencies;
  delete package._moduleDirectories;

  package.scripts = {"prod": "node ./boot.js"};

  fs.writeFile('./dist/package.json', JSON.stringify(package, null, 2), cb);
})

// gulp.task('createEnv', (cb) => {
//   const env = [
//     'APP_PORT=8000',
//     'MOBILE_APP_PORT=8001',
//     'env=prod',
//   ]

//   fs.writeFile('./dist/.env', env.join('\n'), cb);
// })

gulp.task('default', (done) => {
  (gulp.series(
    "buildTs",
    // "moveSchemes",
    "createPackageJson",
    // "createEnv",
  )())

  done()
});
