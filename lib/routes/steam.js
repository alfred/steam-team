let steam = require('../resources/steam');

module.exports = app => {
  app.post( '/steam/game/popular', ( req, res ) => {
    let vanityURLs = req.body.vanityURLs;
    let criteria = req.body.criteria;

    return steam.getMostPopularGameFromVanityURLs( vanityURLs, criteria )
    .then( gameInfo => {
      return res.send( gameInfo );
    })
    .catch( err => {
      return res.send( err );
    });
  });
}
