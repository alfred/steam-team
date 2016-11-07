'use strict';

const assert = require('chai').assert;
const modulePath = '../../../lib/db/mysql';
const Promise = require('bluebird');

describe( 'lib/mysql', () => {

  it ( 'exports a function', () => {
    let db = require('rewire')( modulePath );
    assert.isFunction( db );
  });


});
