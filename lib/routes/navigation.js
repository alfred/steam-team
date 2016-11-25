'use strict';
let path = require('path');

module.exports = app => {
  app.get( '/popular', ( req, res ) => {
    res.sendFile( path.join( __dirname, '../../dist/popular.html' ) );
  });

}
