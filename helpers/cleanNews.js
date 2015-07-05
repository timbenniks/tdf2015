var htmlparser = require( 'htmlparser' ),
    Q = require( 'q' ),
    util = require( 'util' );

function cleanNews( htmlData ){
  var deferred = Q.defer(),
      newsItems = [],

  handler = new htmlparser.DefaultHandler(function( error, dom ){
      
      if( error ){
        deferred.reject( error );
      }
      else {

        dom.forEach( function( tr ){
          var item = {};
          
          tr.children.forEach( function( td ){
            if( td.attribs.class === 'picto' ){
              item.picto = td.children[ 0 ].attribs.class.split( ' ' );
            }

            if( td.attribs.class === 'time' ){
              item.time = td.children[ 0 ].data;
            }

            if( td.attribs.class === 'text' ){
              item.title = td.children[ 0 ].children[ 0 ].data;
              
              item.text = td.children[ 1 ].children[ 0 ].data;

              //td.children.forEach( function( textItem ){
              //  item.text.push( textItem.children[ 0 ].data );
              //} );
            }
          } );

          newsItems.push( item );
        } );

        deferred.resolve( newsItems );
      }
    }),

    parser = new htmlparser.Parser( handler );
    parser.parseComplete( htmlData );

    return deferred.promise;
}

module.exports = cleanNews;