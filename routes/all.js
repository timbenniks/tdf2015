var Q = require( 'q' ),
    getNews = require( '../helpers/getNews' ),
    cleanNews = require( '../helpers/cleanNews' ),
    appState = require( '../helpers/appState' ),
    stageData = require( '../helpers/stageData' ),
    onlyNewNews = require( '../helpers/onlyNewNews' ),
    getStatus = require( '../helpers/getStatus' ),
    notificaton = require( '../helpers/slack' );

module.exports = function( req, res, next ){
  var promises = [],
      appStateObject;

  appState().then( function( state ){
    appStateObject = state;

    var promiseNews = getNews( appStateObject ).then( cleanNews ).then( onlyNewNews ),
        promiseStageData = stageData( appStateObject ),
        promiseStageStatus = getStatus( appStateObject );

    promises.push( promiseNews );
    promises.push( promiseStageData );
    promises.push( promiseStageStatus );

    Q.allSettled( promises ).then( function( promiseResults ){
      var newsItemsProm = promiseResults[ 0 ],
          stageInfoProm = promiseResults[ 1 ],
          stageStatusProm = promiseResults[ 2 ],
          newsItems, stageInfo, stageStatus;

      newsItems = ( newsItemsProm.state === 'rejected' ) ? { error: newsItemsProm.reason } : newsItemsProm.value;
      stageInfo = ( stageInfoProm.state === 'rejected' ) ? { error: stageInfoProm.reason } : stageInfoProm.value;
      stageStatus = ( stageStatusProm.state === 'rejected' ) ? { error: stageStatusProm.reason } : stageStatusProm.value;

      if( newsItems.length <= 3 ){
          newsItems.forEach( function( item ){
            notificaton( item );
          } );
        }

      res.json( { newsItems: newsItems, stageInfo: stageInfo, appState: appStateObject, stageStatus: stageStatus } );
    } );
  } );
};
