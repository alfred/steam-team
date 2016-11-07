'use strict';

const assert = require('chai').assert;
const modulePath = '../../../lib/db/mysql';
const Promise = require('bluebird');

describe( 'lib/mysql', () => {

  it ( 'exports a function', () => {
    let db = require('rewire')( modulePath );
    assert.isFunction( db );
  });

  it ( 'should resolve', done => {
    let db = require('rewire')( modulePath );

    db.__set__( 'mysql', {
      createConnection() {
        return {
          connect( cb ) {
            cb();
          }
        }
      }
    });

    db()
    .then( conn => done() )
    .catch( err => {
      assert.ok( false );
      done( err );
    });
  });

  it ( 'should resolve fast with promise in scope', done => {
    let db = require('rewire')( modulePath );

    db.__set__( 'mysql', {
      createConnection() {
        return {
          connect( cb ) {
            cb();
          }
        }
      }
    });

    db()
    .then( conn1 => {
      db().then( conn2 => {
        assert.equal( conn1, conn2 );
        done();
      });
    })
    .catch( err => {
      assert.ok( false );
      done();
    });
  });

  it ( 'should reject with an error', done => {
    let db = require('rewire')( modulePath );

    db.__set__( 'mysql', {
      createConnection() {
        return {
          connect( cb ) {
            cb( new Error() );
          }
        }
      }
    });

    db()
    .then( conn => {
      assert.ok( false, 'Was supposed to error' );
      done();
    })
    .catch( err => {
      assert.ok( true );
      done();
    });
  });

});
