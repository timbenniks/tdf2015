var Q = require( 'q' ),
    request = require( 'request' );

module.exports = function(){
  var deferred = Q.defer();
  
  request({
    method: 'GET',
    uri: 'http://www.letour.fr/useradgents/2015/json/appState.json'
  }, 
  function( error, response, body ){
    if( response.statusCode === 200 ){
      deferred.resolve( JSON.parse( body ) );
    }
    else {
      deferred.reject( response );
    }
  });
  
  return deferred.promise;
};