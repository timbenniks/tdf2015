var Q = require( 'q' ),
    request = require( 'superagent' ),
    moment = require( 'moment' ),
    getStageType = require( './getStageType' );

module.exports = function( stageData ){
  var deferred = Q.defer(),
      route = stageData.jsonVersions.route,
      stage = stageData.stage;

  request
    .get( 'http://www.letour.fr/useradgents/2015/json/route.' + route + '.json' )
    .accept( 'application/json' )
    .end( function( err, res ){
      if( err && err.status === 404 ){
        deferred.reject( 'Route info not reachable.' );
      }
      else if( err ) {
        deferred.reject( 'Something went wrong while getting the route info.' );
      }

      var data = res.body[ stage ],
          stageData = {
            type: getStageType( data.type ),
            distance: data.distance,
            date: moment( data.date ).format( "D MMMM YYYY" ),
            start: data.start,
            finish: data.finish
          };

      deferred.resolve( stageData );
    });

  return deferred.promise;
};
