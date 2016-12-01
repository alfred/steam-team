'use strict';

let query = require('../db/query');
const tableName = 'users_owned_games';

module.exports = {
  find( attrs = {} ) {
    return query.select( tableName, attrs )
    .then( result => {
      return result;
    })
    .catch( err => {
      console.log('Couldnt find ' + JSON.stringify( attrs ) );
    });
  },

  create( data ) {
    return query.insert( tableName, data )
    .then( result => {
      return result;
    })
    .catch( err => {
      console.log('Couldnt save ' + JSON.stringify( data ) );
    });
  },

  update( attrs = {}, data ) {
    return query.update( tableName, attrs, data )
    .then( result => {
      return result;
    })
    .catch( err => {
      console.log('Couldnt update ' + JSON.stringify( attrs ) );
    });
  },

  delete( attrs ) {
    return query.delete( tableName, attrs )
    .then( result => {
      return result;
    })
    .catch( err => {
      console.log('Couldnt delete ' + JSON.stringify( attrs ) );
    });
  }
}
