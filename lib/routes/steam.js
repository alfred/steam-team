let steam = require('../resources/steam');
let User = require('../models/users');

module.exports = app => {
  app.post( '/steam/popular/ownership', ( req, res ) => {
    let vanityURLs = req.body.vanityURLs;

    return steam.getMostPopularGameByOwnership( vanityURLs )
    .then( gameInfo => {
      return res.send( gameInfo );
    })
    .catch( err => {
      return res.send( err );
    });
  });

  app.post( '/steam/popular/playtime', ( req, res ) => {
    let vanityURLs = req.body.vanityURLs;

    return steam.getMostPopularGameByPlaytime( vanityURLs )
    .then( gameInfo => {
      return res.send( gameInfo );
    })
    .catch( err => {
      return res.send( err );
    });
  });

  app.post( '/steam/user/delete', ( req, res ) => {
    let vanityURLs = req.body.vanityURLs;

    return steam.deleteUsers( vanityURLs )
    .then( deletedUsers => {
      return res.send( deletedUsers );
    })
    .catch( err => {
      return res.send( err );
    });

  });


}
