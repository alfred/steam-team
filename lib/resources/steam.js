'use strict';

let request = require('request');

const steamApiHost = 'https://api.steampowered.com';
const apiKeyParam = 'B2FEE83E31F378B820F5809EC14B1850';

let steamGET = ( url, options ) => {
  return new Promise( ( resolve, reject ) => {
    let opts = {
      url,
      qs: Object.assign( { key : apiKeyParam }, options )
    }

    request.get( opts , ( err, res, body ) => {
      if ( err ) {
        return reject( err );
      }

      resolve( res );
    });
  });
}

module.exports = {
  getUserIdFromUsername( username ) {
    const usernameURL = `${ steamApiHost }/ISteamUser/ResolveVanityURL/v0001/`;

    return steamGET( usernameURL, { vanityurl: username } )
    .then( res => {
      let steamId = JSON.parse( res.body ).response.steamid;

      return steamId;
    })
    .catch( err => console.log );

  },

}
