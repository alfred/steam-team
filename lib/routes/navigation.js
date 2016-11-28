'use strict';

module.exports = ( app, njs ) => {
  app.get( '/', ( req, res ) => {
    res.send( njs.render('pages/index.njs') );
  });

  app.get( '/results', ( req, res ) => {
    res.send( njs.render( 'pages/results.njs', { hello: 'Whatsup' } ) );
  });
}
