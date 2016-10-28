const nunjucksRender = require('gulp-nunjucks-render');

const srcPath = 'www/pages/**/*.+(html|njs)';
const templatesPath = 'www/templates'
const distPath = 'dist';

module.exports = gulp => {

  gulp.task( 'templates', () => {
    return gulp.src( srcPath )
      .pipe( nunjucksRender({
          path: [ templatesPath ]
        }))
      .pipe( gulp.dest( distPath ) );
  });
}
