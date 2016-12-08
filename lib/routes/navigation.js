'use strict';

let Results = require('../models/results');


module.exports = ( app, njs ) => {
  app.get( '/', ( req, res ) => {
    res.send( njs.render('pages/index.njs') );
  });

  app.get( '/results', ( req, res ) => {

    Results.find()
    .then( allResults => {
      allResults.forEach( result => {
        result.query = JSON.parse( result.query );
        result.result = JSON.parse( result.result );
      });

      res.send( njs.render( 'pages/results.njs', { results: allResults } ) );
    })
    .catch( err => {

      res.send( njs.render(
        'pages/results.njs', {
          results: [
          {
            resultId: 1,
            query: JSON.parse( '{"vanityUrls":["http://steamcommunity.com/profiles/76561197972297924"],"url":"/steam/popular/ownership"}' ),
            result: JSON.parse('{"appid":240,"name":"Counter-Strike: Source","playtime_forever":68967,"img_icon_url":"9052fa60c496a1c03383b27687ec50f4bf0f0e10","img_logo_url":"ee97d0dbf3e5d5d59e69dc20b98ed9dc8cad5283","has_community_visible_stats":true,"players":[{"vanityId":"AtlasTehLeet","steamid":"76561197997072425"}]}')
          },
          {
            resultId: 2,
            query: JSON.parse( '{"vanityUrls":["http://steamcommunity.com/profiles/76561197972297924"],"url":"/steam/popular/playtime"}' ),
            result: JSON.parse('{"appid":240,"name":"Counter-Strike: Source","playtime_forever":68967,"img_icon_url":"9052fa60c496a1c03383b27687ec50f4bf0f0e10","img_logo_url":"ee97d0dbf3e5d5d59e69dc20b98ed9dc8cad5283","has_community_visible_stats":true,"players":[{"vanityId":"AtlasTehLeet","steamid":"76561197997072425"},{"vanityId":"AtlasTehLeet","steamid":"76561197997072425"}]}')
          },
          {
            resultId: 3,
            query: JSON.parse( '{ "vanityUrls": ["http://steamcommunity.com/profiles/76561197972297924"], "url": "/steam/user/delete" }' ),
            result: JSON.parse('{}')
          },
        ] }
        ) );
    })

  });
}
