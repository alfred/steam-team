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

    it( 'returns a Promise', () => {
      let steam = require('rewire')( modulePath );
      let steamGET = steam.__get__('steamGET');

      steam.__set__( 'request', {
        get() {}
      });

      assert.instanceOf( steamGET( 'https://alfredabab.io' ), Promise );
    });

    it( 'adds the URL and API key to opts', done => {
      let steam = require('rewire')( modulePath );
      let myUrl = 'https://alfredabab.io';

      steam.__set__( 'request', {
        get( opts ) {
          assert.equal( opts.url, myUrl );
          assert.isDefined( opts.qs.key );
          assert.equal( opts.qs.format, 'json' );
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

      let mockResponse = {
        "response": {
          "steamid": "76561197997072425",
          "success": 1
        }
      }

      steam.__set__( 'request', {
        get( opts, cb ) {
          cb( null, { body: '{\n\t"response": {\n\t\t"steamid": "76561197997072425",\n\t\t"success": 1\n\t}\n}' } );
        }
      });

      let steamGET = steam.__get__('steamGET');

      steamGET('http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=B2FEE83E31F378B820F5809EC14B1850&vanityurl=AtlasTehLeet&format=json')
      .then( res => {
        assert.deepEqual( res, mockResponse );
        done();
      })
      .catch( err => {
        assert.ok( false );
        done( err );
      });
    });
  });

  describe( '#getVanityFromURL', () => {
    it( 'is a function', () => {
      let steam = require('rewire')( modulePath );
      let getVanityFromURL = steam.__get__('getVanityFromURL');

      assert.isFunction( getVanityFromURL );
    });

    it( 'returns if link isnt prefixed', () => {
      let steam = require('rewire')( modulePath );
      let getVanityFromURL = steam.__get__('getVanityFromURL');
      let vanityURL = 'http://www.steamcommunity.com/id/AtlasTehLeet/';

      assert.equal( getVanityFromURL( vanityURL ), 'AtlasTehLeet' );
    });

    it( 'returns if link is http', () => {
      let steam = require('rewire')( modulePath );
      let getVanityFromURL = steam.__get__('getVanityFromURL');
      let vanityURL = 'https://steamcommunity.com/id/AtlasTehLeet/';

      assert.equal( getVanityFromURL( vanityURL ), 'AtlasTehLeet' );
    });

    it( 'returns if link has www', () => {
      let steam = require('rewire')( modulePath );
      let getVanityFromURL = steam.__get__('getVanityFromURL');
      let vanityURL = 'www.steamcommunity.com/id/AtlasTehLeet/';

      assert.equal( getVanityFromURL( vanityURL ), 'AtlasTehLeet' );
    });

    it( 'returns if link has no prefix', () => {
      let steam = require('rewire')( modulePath );
      let getVanityFromURL = steam.__get__('getVanityFromURL');
      let vanityURL = 'steamcommunity.com/id/AtlasTehLeet/';

      assert.equal( getVanityFromURL( vanityURL ), 'AtlasTehLeet' );
    });

  });

  describe( '#getUserIdFromVanityID', () => {

    it( 'is a function', () => {
      let steam = require('rewire')( modulePath );

      assert.isFunction( steam.getUserIdFromVanityID );
    });

    it( 'returns a Promise', () => {
      let steam = require('rewire')( modulePath );
      assert.instanceOf( steam.getUserIdFromVanityID('AtlasTehLeet'), Promise );
    });

    it( 'calls steamGET with a fully formed URL given a username', done => {
      let steam = require('rewire')( modulePath );

      steam.__set__( 'steamGET', ( url, options ) => {
        assert.equal( url, 'https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/' );
        assert.equal( options.vanityurl, 'AtlasTehLeet' );
        done();
      });

      steam.getUserIdFromVanityID('AtlasTehLeet');
    });

    it( 'returns a userId given a username', done => {
      let steam = require('rewire')( modulePath );
      let mockResponse = {
        'response': {
          'steamid': '76561197997072425'
        }
      }
      steam.__set__( 'steamGET', () => Promise.resolve( mockResponse ) );

      steam.getUserIdFromVanityID('AtlasTehLeet')
      .then( steamId => {
        assert.equal( steamId, '76561197997072425' );

        done();
      })
      .catch( err => {
        console.log( err );
        assert.ok( false );
        done( err );
      });

    });

    it( 'throws if theres an error with steamGET', done => {
      let steam = require('rewire')( modulePath );
      steam.__set__( 'steamGET', () => {
        return Promise.reject( new Error() );
      });

      steam.getUserIdFromVanityID('AtlasTehLeet')
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
      .catch( err => {
        assert.ok( false );
        done( err );
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

  describe( '#getMostPopularGameFromUsernames', () => {

    it( 'is a function', () => {
      let steam = require('rewire')( modulePath );

      assert.isFunction( steam.getMostPopularGameFromUsernames );
    });

    it( 'returns a Promise', () => {
      let steam = require('rewire')( modulePath );
      let communityURL = 'http://steamcommunity.com/id/AtlasTehLeet/';

      assert.instanceOf( steam.getMostPopularGameFromUsernames( [ communityURL ] ), Promise );
    });

    it( 'returns the most popular game given a username', done => {
      let steam = require('rewire')( modulePath );
      const mockId = "76561197997072425";
      const mockStats = [
        {
          "appid": 4000,
          "name": "Garry\'s Mod",
          "playtime_forever": 79781,
          "steamid": "76561197997072425"
        }
      ];

      let mockPopular = {
        "appid": 4000,
        "name": "Garry\'s Mod",
        "playtime_forever": 79781,
        "players" : [ { vanityId: 'AtlasTehLeet', steamid: '76561197997072425' } ]
      };
      let communityURL = 'http://steamcommunity.com/id/AtlasTehLeet/';

      steam.__set__( 'getUserIdFromVanityID', () => Promise.resolve( mockId ) );
      steam.__set__( 'getOwnedGamesByUserId', () => Promise.resolve( mockStats ) );
      steam.getMostPopularGameFromUsernames( [ communityURL ] )
      .then( pop => {
        assert.deepEqual( pop, mockPopular );
        done();
      })
      .catch( err => {
        assert.ok( false );
        done( err );
      })

    });

    it( 'throws an error if steam fucks up', done => {
      let steam = require('rewire')( modulePath );
      steam.__set__( 'steamGET', () => {
        return Promise.reject( new Error() );
      });
      let communityURL = 'http://steamcommunity.com/id/AtlasTehLeet/';

      steam.getMostPopularGameFromUsernames( [ communityURL ] )
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
