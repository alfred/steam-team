'use strict';
let steam = require('./steam');
let util = require('../util');
let UsersOwnedGames = require('../models/users-owned-games');
let Games = require('../models/games');
let Results = require('../models/results');

function getMostPopularGameByPlaytime( vanityUrls ) {
  let scopeBreakingResultBullshit = {
    query: JSON.stringify( {
      url: '/popular/playtime',
      vanityUrls
    } )
  };

  let vanityIds = vanityUrls.map( steam.getVanityFromURL );
  let getIds = vanityIds.map( vId => {
    return steam.getUserIdFromVanityID( vId );
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
        game.steamid = game.steamId;
        game.appid = game.gameId;
        game.playtime_forever = game.minutesPlayed;
      });
    });

    let mergedPlaytimes = util.mergeGamePlaytimes( allGamesByUser );
    let mostPlayedGame = util.findMostPopularGameByPlaytime( mergedPlaytimes );

    return Games.find({ gameId: mostPlayedGame.appid })
    .then( games => {
      let winningGame = Object.assign( mostPlayedGame, games[ 0 ] );

      // Im a garbage person
      winningGame.name = winningGame.title;

      scopeBreakingResultBullshit.result = JSON.stringify( winningGame );

      return Results.create( scopeBreakingResultBullshit );
    })
    .then( () => {

      return JSON.parse( scopeBreakingResultBullshit.result );
    });
  });

  // Save to query & result to results

};

function getMostPopularGameByOwnership( vanityUrls ) {
  let scopeBreakingResultBullshit = {
    query: JSON.stringify( {
      url: '/popular/ownership',
      vanityUrls
    } )
  };

  let vanityIds = vanityUrls.map( steam.getVanityFromURL );
  let getIds = vanityIds.map( vId => {
    return steam.getUserIdFromVanityID( vId );
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
        game.appid = game.gameId;
        game.steamid = game.steamId;
        game.playtime_forever = game.minutesPlayed;
      });
    });

    let mergedPlaytimes = util.mergeGamePlaytimes( allGamesByUser );
    let mostPlayedGame = util.findMostPopularGameByOwnership( mergedPlaytimes );

    return Games.find( { gameId: mostPlayedGame.appid } )
    .then( games => {
      let winningGame = Object.assign( mostPlayedGame, games[ 0 ] );

      // Im a garbage person
      winningGame.name = winningGame.title;

      scopeBreakingResultBullshit.result = JSON.stringify( winningGame );

      return Results.create( scopeBreakingResultBullshit );
    })
    .then( () => {

      return JSON.parse( scopeBreakingResultBullshit.result );
    });
  });

  // Save to query & result to results
};

function deleteUsers( vanityUrls ) {
  return steam.deleteUsers( vanityUrls );
}

module.exports = {
  getMostPopularGameByPlaytime,
  getMostPopularGameByOwnership,
  deleteUsers
}
