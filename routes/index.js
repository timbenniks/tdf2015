var Q = require( 'q' ),
    getNews = require( '../helpers/getNews' ),
    cleanNews = require( '../helpers/cleanNews' ),
    appState = require( '../helpers/appState' ),
    stageData = require( '../helpers/stageData' ),
    
    render = function( req, res, data ){
      res.render( 'index', data );
    };
  
module.exports = function( req, res, next ){
  var promises = [],
      promiseNews = appState().then( getNews ).then( cleanNews ),
      promiseStageData = appState().then( stageData );
      promiseAppState = appState();

  promises.push( promiseNews );
  promises.push( promiseStageData );
  promises.push( promiseAppState );

  Q.allSettled( promises ).then( function( promiseResults ){
    var newsItems = promiseResults[ 0 ].value,
        stageInfo = promiseResults[ 1 ].value,
        appState = promiseResults[ 2 ].value;

    render( req, res, { newsItems: newsItems, stageInfo: stageInfo, appState: appState } );
  } );
};