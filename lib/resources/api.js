'use strict';
let steam = require('./steam');
let util = require('../util');
let UsersOwnedGames = require('../models/users-owned-games.js');

getMostPopularGameByPlaytime( vanityUrls ) {
  let vanityIds = communityURLs.map( getVanityFromURL );
  let getIds = vanityIds.map( vId => {
    return getUserIdFromVanityID( vId );
  });

  return Promise.all( getIds )
  .then( steamIds => {
    let gamesByUser = steamIds.map( sId => {
      return UsersOwnedGames.find( { steamId: sId } );
    });

    return Promise.all( gamesByUser );
  })
  .then( allGamesByUser => {
    allGamesByUser.forEach( gByUser => {
      gByUser.forEach( game => {
        game.appId = game.gameId;
      });
    });

    let mergedPlaytimes = util.mergeGamePlaytimes( allGamesByUser );


    return util.findMostPopularGameByPlaytime( mergedPlaytimes );
  });

  // Save to query & result to results

};

getMostPopularGameByOwnership( vanityUrls ) {
  let vanityIds = communityURLs.map( getVanityFromURL );
  let getIds = vanityIds.map( vId => {
    return getUserIdFromVanityID( vId );
  });

  return Promise.all( getIds )
  .then( steamIds => {
    let gamesByUser = steamIds.map( sId => {
      return UsersOwnedGames.find( { steamId: sId } );
    });

    return Promise.all( gamesByUser );
  })
  .then( allGamesByUser => {
    allGamesByUser.forEach( gByUser => {
      gByUser.forEach( game => {
        game.appId = game.gameId;
      });
    });

    let mergedPlaytimes = util.mergeGamePlaytimes( allGamesByUser );


    return util.findMostPopularGameByPlaytime( mergedPlaytimes );
  });


};

module.exports = {
  getMostPopularGameByPlaytime,
  getMostPopularGameByOwnership
}
