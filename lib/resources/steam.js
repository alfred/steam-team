'use strict';

let request = require('request');

const steamApiHost = 'https://api.steampowered.com';
const apiKeyParam = 'B2FEE83E31F378B820F5809EC14B1850';

let steamGET = ( url, options ) => {
  return new Promise( ( resolve, reject ) => {
    const baseParams = {
      key : apiKeyParam,
      format: 'json'
    }

    let opts = {
      url,
      qs: Object.assign( baseParams, options )
    }

    request.get( opts , ( err, res, body ) => {
      if ( err ) {
        return reject( err );
      }

      resolve( res );
    });
  });
}

// Needs a function that takes an array of app ids, game names, and playtime, userids, usernames
// and sums the playtime across app ids to one list

// Then a function finds the game with the highest playtime of that one list and outputs its entire object
// If there are none outputs empty {}
//
// Wrapper function that combines the above two things into some readable thing

module.exports = {
  // Need a wrapper over this that will take an array of usernames and
  // output an array of objects with steamids & usernames
  getUserIdFromUsername( username ) {
    const usernameURL = `${ steamApiHost }/ISteamUser/ResolveVanityURL/v0001/`;
    const opts = {
      vanityurl: username
    };

    return steamGET( usernameURL, opts )
    .then( res => {
      let steamId = res.body.response.steamid;

      return steamId;
    })
    .catch( err => {
      throw err;
    });

  },

  /**
   * getOwnedGamesByUserId        Outputs the list of games that a user
   *                              owns as JSON, including playtime in minutes
   *
   * @param  { String } userId    steam Id of the user whose games to get
   * @return { Array }            Array of games that the user owns with playtime
   */
  getOwnedGamesByUserId( userId ) {
    const ownedGamesURL = `${ steamApiHost }/IPlayerService/GetOwnedGames/v0001/`;
    const opts = {
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
  }



}
