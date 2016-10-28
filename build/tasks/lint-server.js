const eslint = require('gulp-eslint');

const srcPath = 'lib/js/**/*.js';

module.exports = gulp => {

  gulp.task( 'lint-server', () => {
    return gulp.src( srcPath )
      .pipe( eslint({
        useEslintrc: true
      }))
      .pipe( eslint.format() )
      .pipe( eslint.failOnError() );
  });
}
