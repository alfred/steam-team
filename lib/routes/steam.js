let steam = require('../resources/steam');

module.exports = app => {
  app.get( '/steam/user/:name', ( req, res ) => {

    return steam.getUserIdFromUsername( req.params.name )
    .then( userId => {
      return res.send( userId ) ;
    })
    .catch( err => {
      return res.send( err );
    });

  });
}
