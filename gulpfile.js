'use strict';

const gulp = require('gulp');

const clean = require('./build/tasks/clean');
const sass = require('./build/tasks/sass');
const lintServer = require('./build/tasks/lint-server');
const lintClient = require('./build/tasks/lint-client');
const template = require('./build/tasks/templates');
const start = require('./build/tasks/start');
const watch = require('./build/tasks/watch');

[
  clean,
  sass,
  lintServer,
  lintClient,
  template,
  start,
  watch
].forEach( task => {
  task( gulp );
});

gulp.task( 'build', [
  'clean',
  'sass',
  'lint-client',
  'templates',
  'watch'
]);
