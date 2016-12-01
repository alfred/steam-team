'use strict';

let mysql = require('mysql');
let Promise = require('bluebird');
const schema = require('./schema');

let db;

module.exports = () => {
  if ( db instanceof Promise ) {
    return db;
  }

  return db = new Promise( ( resolve, reject ) => {
    let db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      port: 3306,
      multipleStatements: true
    });

    db.connect( err => {
      if ( err ) {
        return reject( err );
      }

      resolve( db );
    });
  });
}
