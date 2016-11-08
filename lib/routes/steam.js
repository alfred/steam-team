let steam = require('../resources/steam');

module.exports = app => {
  app.get( '/steam/user/:name', ( req, res ) => {

    steam.getUserIdFromUsername( req.params.name )
    .then( response => res.send( response.body ) )
    .catch( err => res.send( err ) );
  });
}
