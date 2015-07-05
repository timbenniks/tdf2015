var express = require( 'express' ),
    util = require( 'util' ),
  	router = express.Router(),

    getNews = require( '../helpers/getNews' ),
    cleanNews = require( '../helpers/cleanNews' );

router.get( '/', function( req, res, next ){

  getNews().then( function( data ){
    
    cleanNews( data ).then( function( news ){
      res.render( 'index', { title: 'Tour De France 2015', newsItems: news } );    
    } );
  
  } );
});

module.exports = router;