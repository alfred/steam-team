'use strict';
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

let app = express();
app.use( express.static('dist') );
app.use( bodyParser.json() );
app.set( 'view engine', 'njs' );
nunjucks.configure( 'lib/views', { express: app } );


require('./routes/steam')( app );
require('./routes/navigation')( app, nunjucks );

app.get('*', ( req, res ) => {
  res.send( nunjucks.render('pages/index.njs') );
});

app.listen( 3000, () => {
  console.log('[STEAM TEAM] Starting server');
});
