var Q = require( 'q' ),
    request = require( 'request' );

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
      deferred.resolve( JSON.parse( body )[ stage ] );
    }
    else {
      deferred.reject( 'no route info available.' );
    }
  });
  
  return deferred.promise;
};