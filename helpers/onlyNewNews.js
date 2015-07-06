var Q = require( 'q' ),
    request = require( 'request' ),
    dirty = require( 'dirty' ),
    db = dirty( 'tdf.db' );

module.exports = function( allNews ){
  var deferred = Q.defer(),

  newsToReturn = allNews.filter( function( item ){
    if( !db.get( item.time ) ){
      db.set( item.time, item );
      return true;
    }
    
    return false;
  } );

  deferred.resolve( newsToReturn );
 
  return deferred.promise;
}