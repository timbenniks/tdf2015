var Q = require( 'q' ),
    getNews = require( '../helpers/getNews' ),
    cleanNews = require( '../helpers/cleanNews' ),
    appState = require( '../helpers/appState' ),
    stageData = require( '../helpers/stageData' ),
    getStatus = require( '../helpers/getStatus' );
  
module.exports = function( req, res, next ){
  var promises = [],
      appStateObject;
      
  appState().then( function( state ){
    appStateObject = state;

    var promiseNews = getNews( appStateObject ).then( cleanNews ),
        promiseStageData = stageData( appStateObject ),
        promiseStageStatus = getStatus( appStateObject );

    promises.push( promiseNews );
    promises.push( promiseStageData );
    promises.push( promiseStageStatus );

    Q.allSettled( promises ).then( function( promiseResults ){
      var newsItems = promiseResults[ 0 ].value,
          stageInfo = promiseResults[ 1 ].value,
          stageStatus = promiseResults[ 2 ].value;

      res.render( 'index', { newsItems: newsItems, stageInfo: stageInfo, appState: appStateObject, stageStatus: stageStatus } );
    } );
  } );

  
};