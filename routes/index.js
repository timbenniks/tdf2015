var getNews = require( '../helpers/getNews' ),
    cleanNews = require( '../helpers/cleanNews' );

module.exports = function( req, res, next ){
  getNews()
    .then( cleanNews )
    .then( function( data ){
      res.render( 'index', { title: 'Tour De France 2015', newsItems: data } );    
    } );
}