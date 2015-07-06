// use this: https://github.com/xoxco/node-slack

var getNews = require( '../helpers/getNews' ),
    cleanNews = require( '../helpers/cleanNews' ),
    appState = require( '../helpers/appState' ),
    onlyNewNews = require( '../helpers/onlyNewNews' ),
    
    render = function( req, res, data ){
      if( req.query.type === 'json' ){
        res.json( { newsItems: data } );
      }
      else {
        res.render( 'news', { newsItems: data } );
      }
    };
  
module.exports = function( req, res, next ){
  
  if( req.query.show === 'all' ){
     appState()
      .then( getNews )
      .then( cleanNews )
      .then( function( data ){
        render( req, res, data );
      } );
  }

  if( req.query.show === 'new' || !req.query.show ){
     appState()
      .then( getNews )
      .then( cleanNews )
      .then( onlyNewNews )
      .then( function( data ){
        render( req, res, data );
      } );
  }

 
}