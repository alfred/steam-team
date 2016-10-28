const eslint = require('gulp-eslint');

const srcPath = 'www/js/main.js';
const destPath = 'dist/js';

module.exports = gulp => {

  gulp.task( 'lint-client', () => {
    return gulp.src( srcPath )
      .pipe( eslint({
        useEslintrc: true,
        rules: {
          "no-var": 0
        }
      }))
      .pipe( eslint.format() )
      .pipe( gulp.dest( destPath ) );
  });
}
