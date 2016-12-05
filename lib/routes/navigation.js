'use strict';

module.exports = ( app, njs ) => {
  app.get( '/', ( req, res ) => {
    res.send( njs.render('pages/index.njs') );
  });

  app.get( '/results', ( req, res ) => {
    res.send( njs.render(
      'pages/results.njs', {
        results: [
        {
          resultId: 1,
          query: "{ vanityUrls: [], url: '/steam/popular/ownership' }",
          result: '{"appid":240,"name":"Counter-Strike: Source","playtime_forever":68967,"img_icon_url":"9052fa60c496a1c03383b27687ec50f4bf0f0e10","img_logo_url":"ee97d0dbf3e5d5d59e69dc20b98ed9dc8cad5283","has_community_visible_stats":true,"players":[{"vanityId":"AtlasTehLeet","steamid":"76561197997072425"}]}'
        },
        {
          resultId: 2,
          query: "{ vanityUrls: [], url: '/steam/popular/playtime' }",
          result: '{"appid":240,"name":"Counter-Strike: Source","playtime_forever":68967,"img_icon_url":"9052fa60c496a1c03383b27687ec50f4bf0f0e10","img_logo_url":"ee97d0dbf3e5d5d59e69dc20b98ed9dc8cad5283","has_community_visible_stats":true,"players":[{"vanityId":"AtlasTehLeet","steamid":"76561197997072425"},{"vanityId":"AtlasTehLeet","steamid":"76561197997072425"}]}'
        },
        {
          resultId: 3,
          query: "{ vanityUrls: [], url: '/steam/user/delete' }",
          result: '{}'
        },
      ] }
      ) );
  });
}
