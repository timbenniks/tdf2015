/* globals console*/
import get from './get';

class TDF {
  constructor(){
    get.getLatestData().then( function( data ){
      console.log( data );
    } )
  }
}

require( 'domready' )( function(){
  new TDF();
} );
