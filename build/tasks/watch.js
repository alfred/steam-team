const jsPath = 'www/js/**/*.js';
const scssPath = 'www/scss/**/*.scss';
const templatesPath = 'src/+(pages|templates)/**/*.njs';

module.exports = gulp => {
  gulp.task( 'watch', () => {
    gulp.watch( jsPath, [ 'lint-client' ] );
    gulp.watch( scssPath, [ 'sass' ] );
    gulp.watch( templatesPath, [ 'templates' ] );
  });
}
