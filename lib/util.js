'use strict';

module.exports = {
  mergeGamePlaytimes( playtimesArray ) {
    let totalPlayTime = [];

    playtimesArray.forEach( userPlayTime => {

      userPlayTime.forEach( gamePlayTime => {

        let gameIndex = this.indexOfGame( totalPlayTime, gamePlayTime.appid );
        let currPlayer = {
          username: gamePlayTime.username,
          steamid: gamePlayTime.steamid
        };

        // I really think this coud be better
        if( gameIndex !== -1 ) {
          totalPlayTime[ gameIndex ].playtime_forever += gamePlayTime.playtime_forever;

          totalPlayTime[ gameIndex ].players.push( currPlayer );
        } else {
          delete gamePlayTime.steamid;
          delete gamePlayTime.username;

          gamePlayTime.players = [ currPlayer ];

          totalPlayTime.push( gamePlayTime );
        }

      });
    });

    return totalPlayTime;
  },

  indexOfGame( arr, gameAppId ) {
    function isSameAppId( gameInfo ) {
      return ( gameInfo.appid === gameAppId );
    }

    return arr.findIndex( isSameAppId );
  },

  findMostPopularGame( gamesList ) {
    if ( gamesList.length ) {
      return gamesList.reduce( ( prev, curr ) => {
        return prev.playtime_forever >= curr.playtime_forever ? prev : curr;
      });
    }

    return {};
  }
}
