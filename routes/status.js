var appState = require( '../helpers/appState' ),
    getStatus = require( '../helpers/getStatus' );
   
module.exports = function( req, res, next ){
  appState()
    .then( getStatus )
    .then( function( data ){
      res.json( { status: data } );
    } );
}