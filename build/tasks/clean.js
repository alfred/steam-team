const del = require('del');

const distPath = 'dist/';

module.exports = gulp => {

  gulp.task( 'clean', () => {
    return del.sync( [ distPath ] );
  });
}
