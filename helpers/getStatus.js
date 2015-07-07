var Q = require( 'q' ),
    request = require( 'request' ),
    moment = require( 'moment' );

require( 'moment-duration-format' );

module.exports = function( stageData ){

  var deferred = Q.defer(),
      stage = stageData.stage;
  
  request({
    method: 'GET',
    uri: 'http://www.letour.fr/useradgents/2015/json/livestage' + stage + '.json?_=' + Math.floor( Math.random() * 100000000 ).toString()
  }, 
  function( error, response, body ){
    if( response.statusCode === 200 ){
      var data = JSON.parse( body ),
          status = {
            speed: ( data.s / 1000 ).toFixed( 1 ),
            kmCompleted: data.kp,
            kmRemaining: data.kr,
            groups: []
          };

      if( data.g ){
        data[ 'g' ].forEach( function( group ){
          status.groups.push({
            title: group.t, 
            runnersNo: group.n, 
            delay: ( group.d ) ? moment.duration( group.d, 'seconds' ).format( 'mm:ss' ) : '', 
            jourseys: ( group.j ) ? group.j : '' 
          } );
        } );
      }
      
      deferred.resolve( status );
    }
    else {
      deferred.reject( 'live status not reachable.' );
    }
  });

  return deferred.promise;
};