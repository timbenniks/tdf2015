var Q = require( 'q' ),
    request = require( 'request' ),
    moment = require( 'moment' );

module.exports = function( stageData ){
  console.log(stageData);
  var deferred = Q.defer(),
      riders = stageData.jsonVersions.riders;

  request({
    method: 'GET',
    uri: 'http://www.letour.fr/useradgents/2015/json/riders.' + riders + '.json'
  },
  function( error, response, body ){
    if( response.statusCode === 200 ){
       if( typeof JSON.parse( body ) === "undefined" ){
        deferred.reject( 'Rider info not reachable.' );
      }

      var data = JSON.parse( body ),
          teams = [];

          data.t.forEach( function( team ){
            var riders = team.r.map( function( rider ){
              return data.r[ rider ];
            } ),

            mappedTeam = {
              riders: riders,
              leader: team.di,
              name: team.d,
              shortName: team.i,
              country: team.c
            };

            teams.push( mappedTeam );
          } );

      deferred.resolve( { riders: data.r, teams: teams } );
    }
    else {
      deferred.reject( 'Rider info not available.' );
    }
  });

  return deferred.promise;
};
