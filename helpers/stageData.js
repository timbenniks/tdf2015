var Q = require( 'q' ),
    request = require( 'request' ),
    moment = require( 'moment' );

module.exports = function( stageData ){
  var deferred = Q.defer(),
      route = stageData.jsonVersions.route,
      stage = stageData.stage;
  
  request({
    method: 'GET',
    uri: 'http://www.letour.fr/useradgents/2015/json/route.' + route + '.json'
  }, 
  function( error, response, body ){
    if( response.statusCode === 200 ){
      var data = JSON.parse( body )[ stage ],
          stageData = {
            distance: data.distance,
            date: moment( data.date ).format( "D MMMM YYYY" ),
            start: data.start,
            finish: data.finish
          };
      
      deferred.resolve( stageData );
    }
    else {
      deferred.reject( 'no route info available.' );
    }
  });
  
  return deferred.promise;
};