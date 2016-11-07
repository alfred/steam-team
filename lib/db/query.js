'use strict';

let Promise = require('bluebird');
let db = require('./mysql');

module.exports = {

  db,

  /**
   * Insert data into a mysql table
   * @param {String} table  - name of the table to insert to
   * @param {Object} data   - object to be inserted into table
   * @param {String} suffix - (optional) sql string to be appended to query
   * @return {Promise}      - Resolves into the result of the insert query
   */
  insert( table, data, suffix ) {
    if ( typeof suffix !== 'string' ) {
      suffix = '';
    }

    let sql = `INSERT INTO ${ table } SET ? ${ suffix }`;

    return new Promise( ( resolve, reject ) => {
      return this.db().then( db => {
        db.query( sql, data, ( err, result ) => {
          if ( err ) {
            return reject( err );
          }

          return resolve( result );
        });
      });
    });
  },

  /**
   * Selects data from mysql table
   * @param {String} table  - name of the table to select from
   * @param {Object} where  - object to match in the select
   * @return {Promise}      - Resolves into an array result of the select query
   */

  select( table, where ) {
    return new Promise( ( resolve, reject ) => {
      return this.db().then( db => {
        let keys = Object.keys( Object.assign( {}, where ) );
        let clauses = keys.map( ( key ) => {
          let val = db.escape( where[ key ] );
          return `${ key } = ${ val }`;
        });

        let sql = `SELECT * FROM ${ table } WHERE ${ clauses.join(' AND ') }`;
        db.query( sql, ( err, result ) => {
          if ( err ) {
            return reject( err );
          }

          return resolve( result );
        });
      }).catch( reject );
    });
  },

  /**
   * Update rows with provided data in mysql table
   * @param  {String} table - name of the table to insert into
   * @param  {Object} where - object to match in the select
   * @param  {Object} data - object containing new data to be inserted
   * @return {Promise}     - Resolves into ???
   */
  update( table, where, data ) {
    return new Promise( ( resolve, reject ) => {
      return this.db().then( db => {
        let filterKeys = Object.keys( Object.assign( {}, where ) );
        let filters = [];
        let whereClauses = filterKeys.map( ( key ) => {
          filters.push( db.escape( where[ key ] ) );
          return `${ key } = ?`;
        });

        let colNames = Object.keys( Object.assign( {}, data ) );
        let setClauses = colNames.map( ( key ) => {
          let escaped = db.escape( data[ key ] );
          return `${ key } = ${ escaped }`;
        });

        let sql = `UPDATE ${ table } SET ${ setClauses.join(',') }` +
          ` WHERE ${ whereClauses.join(' AND ') }`;

        db.query( sql, filters, ( err, result ) => {
          if ( err ) {
            return reject( err );
          }

          return resolve( result );
        });
      });
    });
  }

};
