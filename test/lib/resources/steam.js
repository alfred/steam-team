'use strict';

const modulePath = '../../../lib/resources/steam';
let Promise = require('bluebird');
let assert = require('chai').assert;

describe( 'lib/resources/steam', () => {

  it ( 'exports an object', () => {
    let steam = require('rewire')( modulePath );

    assert.isObject( steam );
  });

  describe( '#steamGET', () => {

    it( 'is a function', () => {
      let steam = require('rewire')( modulePath );
      let steamGET = steam.__get__('steamGET');

      assert.isFunction( steamGET );
    });

    it( 'adds the URL and API key to opts', done => {
      let steam = require('rewire')( modulePath );
      let myUrl = 'https://alfredabab.io';

      steam.__set__( 'request', {
        get( opts ) {
          assert.equal( opts.url, myUrl );
          assert.isDefined( opts.qs.key );
          done();
        }
      });
      let steamGET = steam.__get__('steamGET');

      steamGET( myUrl );
    });

    it( 'rejects with an error', done => {
      let steam = require('rewire')( modulePath );

      steam.__set__( 'request', {
        get( opts, cb ) {
          cb( new Error() );
        }
      });

      let steamGET = steam.__get__('steamGET');

      steamGET('https://alfredabab.io')
      .catch( err => {
        assert.ok( true );
        done();
      });
    });

    it( 'resolves with a response', done => {
      let steam = require('rewire')( modulePath );

      steam.__set__( 'request', {
        get( opts, cb ) {
          cb( null, 'Response' );
        }
      });

      let steamGET = steam.__get__('steamGET');
      steamGET('https://alfredabab.io')
      .then( res => {
        assert.equal( res, 'Response' );
        done();
      })
      .catch( err => {
        assert.ok( false );
        done();
      });
    });
  });

  describe( '#getUserIdFromUsername', () => {

    it( 'is a function', () => {
      let steam = require('rewire')( modulePath );

      assert.isFunction( steam.getUserIdFromUsername );
    });

    it( 'calls steamGET with a fully formed URL given a username', done => {
      let steam = require('rewire')( modulePath );

      steam.__set__( 'steamGET', ( url, options ) => {
        assert.equal( url, 'https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/' );
        assert.equal( options.vanityurl, 'atlas32' );
        done();
      });

      steam.getUserIdFromUsername('atlas32');
    });
  });
});
