var Q = require( 'q' ),
    request = require( 'superagent' ),
    moment = require( 'moment' ),
    getRiders = require( './getRiders' ),
    getRiderForID = require( './getRiderForID' );

require( 'moment-duration-format' );

module.exports = function( stageData ){

  var deferred = Q.defer(),
      stage = stageData.stage;

  getRiders( stageData ).then( function( riders ){

    request
      .get( 'http://www.letour.fr/useradgents/2015/json/livestage' + stage + '.json' )
      .query( { '_': Date.now().toString() } )
      .accept( 'application/json' )
      .set( 'X-Requested-With', 'XMLHttpRequest' )
      .set( 'Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1' )
      .end( function( err, res ){
        if( err && err.status === 404 ){
          deferred.reject( 'Status not reachable.' );
        }
        else if( err ){
          console.log('status:', err)
          deferred.reject( 'Something went wrong while getting the status.' );
        }

        if( res !== undefined && res.body !== undefined ){
          var data = res.body,
              status = {
                speed: ( data.s ) ? ( data.s / 1000 ).toFixed( 1 ) + 'km/h' : '-',
                kmCompleted: ( data.kp ) ? data.kp + 'km' : '-',
                kmCompletedInt: ( data.kp ) ? data.kp : 0,
                kmRemaining: ( data.kr ) ? data.kr + 'km' : '-',
                groups: []
              };

          if( data.g ){
            data[ 'g' ].forEach( function( group ){
              var mappedRiders = [];

              if( group.r ){
                mappedRiders = group.r.map( function( rider ){
                  var updatedRider = getRiderForID( riders, rider.r );
                  updatedRider.behind = '+' + moment.duration( rider.t, 'seconds' ).format( 'hh:mm:ss', { trim: false } );

                  return updatedRider;
                } )
              }

              status.groups.push({
                title: group.t,
                runnersNo: group.n,
                delay: ( group.d ) ? moment.duration( group.d, 'seconds' ).format( 'mm:ss', { trim: false } ) : '',
                jerseys: ( group.j ) ? group.j.split( '' ) : [],
                riders: mappedRiders
              } );
            } );

            status.groups = status.groups.reverse();
          }

          deferred.resolve( status );
        }

        deferred.reject( 'Something went wrong while getting the status.' );
      });

  } );

  return deferred.promise;
};
