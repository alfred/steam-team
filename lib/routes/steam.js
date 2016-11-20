let steam = require('../resources/steam');

module.exports = app => {
  app.post( '/steam/game/popular', ( req, res ) => {
    let vanityURLs = req.body.vanityURLs;

    return steam.getMostPopularGameFromVanityURLs( vanityURLs )
    .then( gameInfo => {
      return res.send( gameInfo );
    })
    .catch( err => {
      return res.send( err );
    });
  });
}
