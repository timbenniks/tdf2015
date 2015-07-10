var Q = require( 'q' ),
    request = require( 'superagent' );

module.exports = function(){
  var deferred = Q.defer();

  request
    .get( 'http://www.letour.fr/useradgents/2015/json/appState.json' )
    .accept( 'application/json' )
    .end( function( err, res ){
      if( err && err.status === 404 ){
        deferred.reject( 'App state not reachable' );
      }
      else if( err ) {
        deferred.reject( 'Something went wrong while asking for the app state' );
      }

      deferred.resolve( res.body );
    });

  return deferred.promise;
};
