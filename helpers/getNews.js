var Q = require( 'q' ),
    request = require( 'request' );

module.exports = function( stageData ){

  var deferred = Q.defer(),
      stage = stageData.stage;

  request({
    method: 'GET',
    uri: 'http://www.letour.fr/useradgents/2015/json/livenews' + stage + '_en.json?_=' + Math.floor( Math.random() * 100000000 ).toString()
  },
  function( error, response, body ){
    if( response.statusCode === 200 ){
      if( typeof JSON.parse( body ) === "undefined" ){
        deferred.reject( 'live news not reachable.' );
      }

      var data = JSON.parse( body );

      if( data.d ){
        deferred.resolve( data.d );
      }
      else {
        deferred.reject( 'no live news yet.' );
      }
    }
    else {
      deferred.reject( 'no live news yet.' );
    }
  });

  return deferred.promise;
};
