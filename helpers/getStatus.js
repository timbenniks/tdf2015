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

      if( typeof JSON.parse( body ) === "undefined" ){
        deferred.reject( 'live status not reachable.' );
      }

      var data = JSON.parse( body ),
          status = {
            speed: ( data.s ) ? ( data.s / 1000 ).toFixed( 1 ) + 'km/h' : '-',
            kmCompleted: ( data.kp ) ? data.kp + 'km' : '-',
            kmCompletedInt: ( data.kp ) ? data.kp : 0,
            kmRemaining: ( data.kr ) ? data.kr + 'km' : '-',
            groups: []
          };

      if( data.g ){
        data[ 'g' ].forEach( function( group ){
          status.groups.push({
            title: group.t,
            runnersNo: group.n,
            delay: ( group.d ) ? moment.duration( group.d, 'seconds' ).format( 'mm:ss' ) : '',
            jerseys: ( group.j ) ? group.j.split( '' ) : '',
            riders: ( group.r ) ? group.r : []
          } );
        } );

        status.groups = status.groups.reverse();
      }

      deferred.resolve( status );
    }
    else {
      deferred.reject( 'live status not reachable.' );
    }
  });

  return deferred.promise;
};
