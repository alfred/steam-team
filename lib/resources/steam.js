'use strict';

let request = require('request');
let util = require('../util');
let Promise = require('bluebird');

const steamApiHost = 'https://api.steampowered.com';
const apiKeyParam = 'B2FEE83E31F378B820F5809EC14B1850';

let steamGET = ( url, options ) => {
  return new Promise( ( resolve, reject ) => {
    let baseParams = {
      key : apiKeyParam,
      format: 'json'
    }

    let opts = {
      url,
      qs: Object.assign( baseParams, options )
    }

    request.get( opts, ( err, res, body ) => {
      if ( err ) {
        return reject( err );
      }
      let jsonRes = JSON.parse( res.body );

      resolve( jsonRes );
    });
  });
};

let getVanityFromURL = url => {

};

/**
 * getUserIdFromVanityURL          Resolves a steam username into its steam ID
 * @param  { String } username    Steam account username
 * @return { String }             Steam ID is base64 string
 */
function getUserIdFromVanityURL( username ) {
  const usernameURL = `${ steamApiHost }/ISteamUser/ResolveVanityURL/v0001/`;
  let opts = {
    vanityurl: username
  };

  return steamGET( usernameURL, opts )
  .then( res => {
    let steamId = res.response.steamid;

    return steamId;
  })
  .catch( err => {
    throw err;
  });
};

/**
 * getOwnedGamesByUserId        Outputs the list of games that a user
 *                              owns as JSON, including playtime in minutes
 *
 * @param  { String } userId    steam Id of the user whose games to get
 * @return { Array }            Array of games that the user owns with playtime
 */
function getOwnedGamesByUserId( userId ) {
  const ownedGamesURL = `${ steamApiHost }/IPlayerService/GetOwnedGames/v0001/`;
  let opts = {
    steamid: userId,
    include_appinfo: 1,
    include_played_free_games: 1
  };

  return steamGET( ownedGamesURL, opts )
  .then( res => {
    let games = res.response.games;

    games.forEach( game => game.steamid = userId );
    return games;
  })
  .catch( err => {
    throw err;
  });
};

function getMostPopularGameFromUsernames( usernames ) {
  let getIds = usernames.map( user => {
    return getUserIdFromVanityURL( user );
  });



  return Promise.all( getIds )
  .then( steamIds => {
    return Promise.all( steamIds.map( id => getOwnedGamesByUserId( id ) ) );
  })
  .then( usersPlayTimes => {
    usersPlayTimes.forEach( ( individualStats, index ) => {
      individualStats.forEach( gameInfo => {
        gameInfo['username'] = usernames[ index ];
      });
    });
    let merged = util.mergeGamePlaytimes( usersPlayTimes );

    return util.findMostPopularGame( merged );
  })
  .catch( err => {
    throw err;
  });
}


module.exports = {
  getUserIdFromVanityURL,
  getOwnedGamesByUserId,
  getMostPopularGameFromUsernames
}
