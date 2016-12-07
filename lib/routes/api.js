'use strict';

let api = require('../resources/api');

module.exports = app => {
  app.post( '/api/popular/ownership', ( req, res ) => {
    let vanityURLs = req.body.vanityURLs;

    return api.getMostPopularGameByOwnership( vanityURLs )
    .then( info => {
      return res.send( info );
    })
    .catch( err => {
      return res.send( err );
    });
  });

  app.post( '/api/popular/playtime', ( req, res ) => {
    let vanityURLs = req.body.vanityURLs;

    return api.getMostPopularGameByPlaytime( vanityURLs )
    .then( info => {
      return res.send( info );
    })
    .catch( err => {
      return res.send( err );
    });
  });
}
