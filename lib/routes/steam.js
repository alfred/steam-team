let steam = require('../resources/steam');

module.exports = app => {
  app.post( '/steam/game/popular', ( req, res ) => {
    let usernames = req.body.usernames;

    return steam.getMostPopularGameFromUsernames( usernames )
    .then( gameInfo => {
      return res.send( gameInfo );
    })
    .catch( err => {
      return res.send( err );
    });
  });
}
