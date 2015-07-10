var appState = require( '../helpers/appState' );

module.exports = function( req, res, next ){
  appState().then( function( data ){
    res.json( data );
  } );
}
