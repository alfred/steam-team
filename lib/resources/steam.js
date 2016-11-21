'use strict';

let request = require('request');
let util = require('../util');
let Promise = require('bluebird');

const steamApiHost = 'https://api.steampowered.com';
const apiKeyParam = 'B2FEE83E31F378B820F5809EC14B1850';

// Regex to get the ID from a vanity url
const vanityRegEx = /(?:http(?:s|):\/\/|)(?:www.|)steamcommunity\.com\/id\/([a-zA-Z]*)(?:\/)/g;

// Regex to get the SteamID from non-custom url
const nonCustomRegEx = /(?:http(?:s|):\/\/|)(?:www.|)steamcommunity\.com\/profiles\/([0-9]*)(?:\/|)/g;

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
  if ( url.match( vanityRegEx ) ) {
    return vanityRegEx.exec( url )[ 1 ];
  }

  return url;
};

let getGamesFromVanityURLs = ( communityURLs ) => {
  let vanityIds = communityURLs.map( getVanityFromURL );
  let getIds = vanityIds.map( vId => {
    return getUserIdFromVanityID( vId );
  });

  return Promise.all( getIds )
  .then( steamIds => {
    return Promise.all( steamIds.map( id => getOwnedGamesByUserId( id ) ) );
  })
  .then( usersPlayTimes => {
    usersPlayTimes.forEach( ( individualStats, index ) => {
      individualStats.forEach( gameInfo => {
        gameInfo['vanityId'] = vanityIds[ index ];
      });
    });

    return util.mergeGamePlaytimes( usersPlayTimes );
  })
  .catch( err => {
    throw err;
  });
}

/**
 * getUserIdFromVanityID         Resolves a steam profile into its steam ID
 * @param  { String } profile     Steam account profile url
 * @return { String }             Steam ID is base64 string
 */
function getUserIdFromVanityID( vanityId ) {
  const resolveVanityURL = `${ steamApiHost }/ISteamUser/ResolveVanityURL/v0001/`;

  if ( vanityId.match( nonCustomRegEx ) ) {
    return Promise.resolve( nonCustomRegEx.exec( vanityId )[ 1 ] );
  }

  let opts = {
    vanityurl: vanityId
  };

  return steamGET( resolveVanityURL, opts )
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

function getMostPopularGameByOwnership( vanityUrls ) {
  return getGamesFromVanityURLs( vanityUrls )
  .then( mergedGames => {
    return util.findMostPopularGameByOwnership( mergedGames );
  })
  .catch( err => {
    throw err;
  });
}

function getMostPopularGameByPlaytime( vanityUrls ) {
  return getGamesFromVanityURLs( vanityUrls )
  .then( mergedGames => {
    return util.findMostPopularGameByPlaytime( mergedGames );
  })
  .catch( err => {
    throw err;
  });
}


module.exports = {
  getUserIdFromVanityID,
  getOwnedGamesByUserId,
  getMostPopularGameByOwnership,
  getMostPopularGameByPlaytime
}
