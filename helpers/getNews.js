var Q = require( 'q' ),
    request = require( 'superagent' );

module.exports = function( stageData ){

  var deferred = Q.defer(),
      stage = stageData.stage;

  request
    .get( 'http://www.letour.fr/useradgents/2015/json/livenews' + stage + '_en.json' )
    .query( { '_': Date.now().toString() } )
    .accept( 'application/json' )
    .set( 'X-Requested-With', 'XMLHttpRequest' )
    .set( 'Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1' )
    .end( function( err, res ){
      if( err && err.status === 404 ){
        deferred.reject( 'live news not reachable.' );
      }
      else if( err ) {
        deferred.reject( 'no live news yet.' );
      }

      if( !res || !res.body ){
        deferred.reject( 'no live news yet.' );
      }

      if( typeof res.body.d === "undefined" ){
        deferred.reject( 'no live news yet.' );
      }

      deferred.resolve( res.body.d );
    });

  return deferred.promise;
};
