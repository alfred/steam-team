const nodemon = require('gulp-nodemon');

module.exports = gulp => {
  gulp.task( 'start', () => {
    return nodemon( {
      script: 'lib/app.js',
      ext: 'js',
      watch: 'lib',
    } )
  })
}
