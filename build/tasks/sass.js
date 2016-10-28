const sass = require('gulp-sass');

const srcPath = 'www/scss/index.scss';
const destPath = 'dist/css/';

module.exports = gulp => {

  gulp.task( 'sass', () => {
    return gulp.src( srcPath )
      .pipe( sass( {
        outputStyle: 'expanded',
        outFile: 'index.css',
        sourceMap: true
      } ).on( 'error', sass.logError ) )
      .pipe( gulp.dest( destPath ) );
  });
}
