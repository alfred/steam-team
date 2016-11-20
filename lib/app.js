'use strict';
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
app.use( express.static('dist') );
app.use( bodyParser.json() );

require('./routes/steam')( app );

app.listen( 3000, () => {
  console.log('[STEAM TEAM] Starting server');
});
