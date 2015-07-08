var Q = require( 'q' ),
    request = require( 'request' ),
    dirty = require( 'dirty' ),
    db = dirty( 'tdf.db' ),
    moment = require( 'moment' );

module.exports = function( allNews ){
  var deferred = Q.defer(),

  newsToReturn = allNews.filter( function( item ){
    if( !db.get( moment().format( 'DDMMYYYY' ) + '_' + item.time ) ){
      db.set( moment().format( 'DDMMYYYY' ) + '_' + item.time, item );
      return true;
    }

    return false;
  } );

  deferred.resolve( newsToReturn );

  return deferred.promise;
};
