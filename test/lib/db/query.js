'use strict';

const assert = require('chai').assert;
const modulePath = '../../../lib/db/query';
const Promise = require('bluebird');


describe( 'db/query', () => {

  describe( '#insert', () => {

    function querySuccess( query, data, callback ) {
      callback( null, data );
    }

    function queryFail( query, data, callback ) {
      callback( new Error(), data );
    }

    it('should return a promise', () => {
      let query = require('rewire')( modulePath );

      query.db = () => {
        return Promise.resolve({
          query: querySuccess
        })
      };

      let p = query.insert();
      assert.instanceOf( p, Promise );
    });

    it('should resolve', ( done ) => {
      let query = require('rewire')( modulePath );

      query.db = () => {
        return Promise.resolve({
          query: querySuccess
        })
      };

      query.insert()
      .then( () => done() )
      .catch( done );
    });

    it('should reject', ( done ) => {
      let query = require('rewire')( modulePath );

      query.db = () => {
        return Promise.resolve({
          query: queryFail
        })
      };

      query.insert()
      .catch( ( err ) => done() );
    });

    it( 'should append suffix', done => {
      let query = require('rewire')( modulePath );

      query.db = () => {
        return Promise.resolve({
          query( sql, data, cb ) {
            assert.isTrue( /something/.test( sql ) );
            done();
            return Promise.resolve();
          }
        })
      };

      query.insert( 'foo', { foo: 'bar' }, 'something' )
      .catch( done );
    });

  });

  describe( '#select', () => {

    function querySuccess( query, callback ) {
      callback( null );
    }

    function queryFail( query, callback ) {
      callback( new Error() );
    }

    it('should return a promise', () => {
      let query = require('rewire')( modulePath );

      query.db = () => {
        return Promise.resolve({
          query: querySuccess
        })
      };

      let p = query.select();
      assert.instanceOf( p, Promise );
    });

    it('should reject', ( done ) => {
      let query = require('rewire')( modulePath );

      query.db = () => {
        return Promise.resolve({
          query: queryFail
        })
      };

      query.select()
      .catch( ( err ) => done() );
    });

    it('should build query given a where clause', ( done ) => {
      let query = require('rewire')( modulePath );

      query.db = () => {
        return Promise.resolve({
          query( sql, cb ) {
            assert.equal(
              sql,
              'SELECT * FROM foo WHERE bar = baz'
            );
            cb( null, [] );
          },
          escape( val ) {
            return val;
          }
        })
      };

      query.select( 'foo', { bar: 'baz' } )
      .then( () => done() )
      .catch ( done );
    });
  });

  describe('#update', () => {
    function querySuccess( query, data, callback ) {
      callback( null, data );
    }

    function queryFail( query, data, callback ) {
      callback( new Error(), data );
    }

    it('should return a promise', () => {
      let query = require('rewire')( modulePath );

      query.db = () => {
        return Promise.resolve({
          query: querySuccess
        })
      };

      let p = query.update();
      assert.instanceOf( p, Promise );
    });

    it('should reject', ( done ) => {
      let query = require('rewire')( modulePath );

      query.db = () => {
        return Promise.resolve({
          query: queryFail
        })
      };

      query.update()
      .catch( ( err ) => done() );
    });

    it('should build query with where & data clauses', function ( done ) {
      let query = require('rewire')( modulePath );

      query.db = () => {
        return Promise.resolve({
          query( sql, where, cb ) {
            assert.equal(
              sql,
              'UPDATE foo SET bar = anything WHERE bar = ?'
            );
            cb( null, [] );
          },
          escape( val ) {
            return val;
          }
        })
      };

      query.update( 'foo', { bar: 'baz' }, { bar: 'anything'} )
      .then( () => done() )
      .catch ( done );
    });

  });

});
