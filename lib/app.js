'use strict';
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const schema = require('./db/schema');
let db = require('./db/mysql');

let app = express();
app.use( express.static('dist') );
app.use( bodyParser.json() );
app.set( 'view engine', 'njs' );
nunjucks.configure( 'lib/views', { express: app } );


require('./routes/steam')( app );
require('./routes/api')( app );
require('./routes/navigation')( app, nunjucks );

app.get('*', ( req, res ) => {
  res.send( nunjucks.render('pages/index.njs') );
});

db()
.then( conn => {
  conn.query( schema, err => {
  // conn.query( 'Use steamTeam;' , err => {
    if ( err ) {
      return reject( err );
    }

    return conn;
  });
})
.then( () => {
  app.listen( 3000, () => {
    console.log('[STEAM TEAM] Starting server');
  });
})
.catch( err => {
  console.log( err );
  console.log('Failed adding schema, so failed initilizing server');
})

