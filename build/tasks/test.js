'use strict';

const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

const srcPath = 'lib/**/*.js';
const serverFile = '!lib/app.js';
const testPath = 'test/lib/**/*.js';

module.exports = gulp => {
  gulp.task( 'pre-test', () => {
    return gulp.src( [
      srcPath,
      serverFile
      ])
      .pipe( istanbul( { includeUntested: true } ) )
      .pipe( istanbul.hookRequire() );
  });

  gulp.task( 'mocha', [ 'pre-test' ], () => {
    return gulp.src( [ testPath ] )
      .pipe( mocha() )
      .pipe( istanbul.writeReports() )
      .pipe( istanbul.enforceThresholds( { thresholds: { global: 100 } } ) )
      .once( 'end', () => process.exit( 0 ) )
      .once( 'error', () => process.exit( 1 ) );
  });
}
