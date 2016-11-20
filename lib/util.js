'use strict';

module.exports = {
  mergeGamePlaytimes( playtimesArray ) {
    let totalPlayTime = [];

    playtimesArray.forEach( userPlayTime => {

      userPlayTime.forEach( gamePlayTime => {

        let gameIndex = this.indexOfGame( totalPlayTime, gamePlayTime.appid );

        if( gameIndex !== -1 ) {
          totalPlayTime[ gameIndex ].playtime_forever += gamePlayTime.playtime_forever;
          totalPlayTime[ gameIndex ].players.push( gamePlayTime.steamid );
        } else {
          gamePlayTime.players = [ gamePlayTime.steamid ];
          delete gamePlayTime.steamid;

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
  }
}
