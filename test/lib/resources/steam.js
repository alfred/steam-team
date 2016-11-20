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

    it( 'returns a userId given a username', done => {
      let steam = require('rewire')( modulePath );
      let mockResponse = {
        body : {
          response: {
            steamid: "76561198185570222"
          }
        }
      }
      steam.__set__( 'steamGET', () => Promise.resolve( mockResponse ) );

      steam.getUserIdFromUsername('atlas32')
      .then( steamId => {
        assert.equal( steamId, '76561198185570222' );

        done();
      })
      .catch( err => {
        assert.ok( false );
        done( err );
      });

    });

    it( 'throws if theres an error with steamGET', done => {
      let steam = require('rewire')( modulePath );
      steam.__set__( 'steamGET', () => {
        return Promise.reject( new Error() );
      });

      steam.getUserIdFromUsername()
      .then( res => {
        assert.ok( false );
        done( res );
      })
      .catch( err => {
        assert.ok( true );
        done();
      });
    });
  });

  describe( '#getOwnedGamesByUserId', () => {

    it( 'is a function', () => {
      let steam = require('rewire')( modulePath );

      assert.isFunction( steam.getOwnedGamesByUserId );
    });

    it( 'calls steamGET with a fuly formed URL given userid', done => {
      let steam = require('rewire')( modulePath );

      steam.__set__( 'steamGET', ( url, options ) => {
        assert.equal( url, 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/' );
        assert.equal( options.steamid, '76561197997072425' );
        assert.equal( options.include_appinfo, 1 );
        assert.equal( options.include_played_free_games, 1 );
        done();
      });

      steam.getOwnedGamesByUserId('76561197997072425');
    });

    it( 'returns an array of games that the user owns with playtime', done => {
      let steam = require('rewire')( modulePath );
      const userId = '76561197997072425';
      let mockResponse = {
        response: {
          games: [
            {
              "appid": 240,
              "name": "Counter-Strike: Source",
              "playtime_forever": 68967,
              "img_icon_url": "9052fa60c496a1c03383b27687ec50f4bf0f0e10",
              "img_logo_url": "ee97d0dbf3e5d5d59e69dc20b98ed9dc8cad5283",
              "has_community_visible_stats": true
            }
          ]
        }
      };
      let mockGames = mockResponse.response.games;
      // Might be the laziest line ever written
      mockGames.forEach( g => g.steamid = userId );

      steam.__set__( 'steamGET', () => Promise.resolve( mockResponse ) );

      steam.getOwnedGamesByUserId( userId )
      .then( games => {
        assert.deepEqual( games, mockGames );

        done();
      })
    });

    it( 'throws if theres an error with steamGet', done => {
      let steam = require('rewire')( modulePath );
      steam.__set__( 'steamGET', () => {
        return Promise.reject( new Error() );
      });

      steam.getOwnedGamesByUserId('76561197997072425')
      .then( res => {
        assert.ok( false );
        done( res );
      })
      .catch( err => {
        assert.ok( true );
        done();
      });
    });
  });
});
