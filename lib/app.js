'use strict';
const express = require('express');

let app = express();
app.use( express.static('dist') );

require('./routes/steam')( app );

app.listen( 3000, () => {
  console.log('[STEAM TEAM] Starting server');
});
