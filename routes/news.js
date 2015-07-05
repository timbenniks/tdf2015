var express = require( 'express' ),
    util = require( 'util' ),
  	router = express.Router(),

    getNews = require( '../helpers/getNews' ),
    cleanNews = require( '../helpers/cleanNews' );

router.get( '/', function( req, res, next ){

  getNews().then( function( data ){
    
    cleanNews( data ).then( function( news ){
      switch( req.query.type ){
        case 'json':
          res.json( { newsItems: news } );
        break;

        case 'html':
          res.render( 'news', { newsItems: news } );
        break;
        
        default:
          res.render( 'news', { newsItems: news } );
      }
    } );
  
  } );
});

module.exports = router;