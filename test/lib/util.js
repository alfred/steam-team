'use strict';

const modulePath = '../../lib/util';
let assert = require('chai').assert;

describe( 'lib/util', () => {

  it( 'exports an object', () => {
    let util = require('rewire')( modulePath );

    assert.isObject( util );
  });

  describe( '#mergeGamePlaytimes', () => {

    it( 'is a function', () => {
      let util = require('rewire')( modulePath );

      assert.isFunction( util.mergeGamePlaytimes );
    });

    it( 'merges playtimes and records all steamids attached', () => {
      let util = require('rewire')( modulePath );
      let mockPlayTimesArray = [
        [{
           "appid": 240,
           "name": "Counter-Strike: Source",
           "playtime_forever": 68967,
           "steamid": "0",
           "username": "zero"
         },
         {
           "appid": 300,
           "name": "Day of Defeat: Source",
           "playtime_forever": 58,
           "steamid": "0",
           "username": "zero"
         }],
         [{
            "appid": 240,
            "name": "Counter-Strike: Source",
            "playtime_forever": 68967,
            "steamid": "1",
            "username": "one"
          },
          {
            "appid": 300,
            "name": "Day of Defeat: Source",
            "playtime_forever": 58,
            "steamid": "1",
            "username": "one"
          }]
      ];

      let mergedPlaytimes = [
        {
          "appid": 240,
          "name": "Counter-Strike: Source",
          "playtime_forever": 137934,
          "players" : [
            { "username": "zero", "steamid" : "0" },
            { "username": "one", "steamid" : "1" }
          ]
        },
        {
          "appid": 300,
          "name": "Day of Defeat: Source",
          "playtime_forever": 116,
          "players" : [
            { "username": "zero", "steamid" : "0" },
            { "username": "one", "steamid" : "1" }
          ]
        }
      ];

      assert.sameDeepMembers( util.mergeGamePlaytimes( mockPlayTimesArray ), mergedPlaytimes );
    });
  });

  describe( '#indexOfGame', () => {

    it( 'is a function', () => {
      let util = require('rewire')( modulePath );

      assert.isFunction( util.indexOfGame );
    });

    it( 'returns an index of a game when the appIds match', () => {
      let util = require('rewire')( modulePath );
      let mockGamePlayTime = [{
        "appid": 240,
        "name": "Counter-Strike: Source",
        "playtime_forever": 68967,
        "img_icon_url": "9052fa60c496a1c03383b27687ec50f4bf0f0e10",
        "img_logo_url": "ee97d0dbf3e5d5d59e69dc20b98ed9dc8cad5283",
        "has_community_visible_stats": true
      }];

      assert.equal( util.indexOfGame( mockGamePlayTime, 240 ), 0 );
    });

    it( 'returns a -1 if the appId isnt found', () => {
      let util = require('rewire')( modulePath );

      assert.equal( util.indexOfGame( [], 240 ), -1 );
    });
  });

  describe( '#findMostPopularGame', () => {

    it( 'is a function', () => {
      let util = require('rewire')( modulePath );

      assert.isFunction( util.findMostPopularGame );
    });

    it( 'outputs the game object with the highest playtime_forever', () => {
      let util = require('rewire')( modulePath );
      let mergedPlaytimes = [
        {
          "appid": 240,
          "name": "Counter-Strike: Source",
          "playtime_forever": 137934,
          "players" : [ '0', '1' ]
        },
        {
          "appid": 300,
          "name": "Day of Defeat: Source",
          "playtime_forever": 116,
          "players" : [ '0', '1' ]
        }
      ];

      let mostPopular = {
        "appid": 240,
        "name": "Counter-Strike: Source",
        "playtime_forever": 137934,
        "players" : [ '0', '1' ]
      };

      assert.deepEqual( util.findMostPopularGame( mergedPlaytimes ), mostPopular );
    });

    it( 'outputs the game with the highest playtime_forever lmao', () => {
      let util = require('rewire')( modulePath );
      let mergedPlaytimes = [
        {
          "appid": 300,
          "name": "Day of Defeat: Source",
          "playtime_forever": 116,
          "players" : [ '0', '1' ]
        },
        {
          "appid": 240,
          "name": "Counter-Strike: Source",
          "playtime_forever": 137934,
          "players" : [ '0', '1' ]
        }
      ];

      let mostPopular = {
        "appid": 240,
        "name": "Counter-Strike: Source",
        "playtime_forever": 137934,
        "players" : [ '0', '1' ]
      };

      assert.deepEqual( util.findMostPopularGame( mergedPlaytimes ), mostPopular );
    });

    it( 'outputs an empty obj if no highest is found', () => {
      let util = require('rewire')( modulePath );
      assert.deepEqual( util.findMostPopularGame( [] ), {} );
    });

  });
});
