var Q = require( 'q' ),
    request = require( 'superagent' ),
    moment = require( 'moment' );

module.exports = function( stageData ){
  var deferred = Q.defer(),
      starters = stageData.jsonVersions.starters;

  request
    .get( 'http://www.letour.fr/useradgents/2015/json/starters.' + starters + '.json' )
    .accept( 'application/json' )
    .end( function( err, res ){
      if( err && err.status === 404 ){
        deferred.reject( 'Rider info not reachable.' );
      }
      else if( err ) {
        deferred.reject( 'Something went wrong while getting the rider info.' );
      }

      var data = res.body;
      deferred.resolve( data.r );
    });

  return deferred.promise;
};
