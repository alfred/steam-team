'use strict'

let mysql = require('mysql');
let Promise = require('bluebird');

let db;

module.exports = () => {
  if ( db instanceof Promise ) {
    return db;
  }

  return db = new Promise( ( resolve, reject ) => {
    let db = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      database: 'SteamDB'
    });

    db.connect( err => {
      if ( err ) {
        return reject( err );
      }

      resolve( db );
    });
  });
}
