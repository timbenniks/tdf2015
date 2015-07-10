var appState = require( '../helpers/appState' ),
    getRiders = require( '../helpers/getRiders' );

module.exports = function( req, res, next ){
  appState()
    .then( getRiders )
    .then( function( data ){
      res.json( data );
    } );
}
