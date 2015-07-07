/* globals console*/

class TDF {
  constructor(){
    console.log('ready');
  }
}

require( 'domready' )( function(){
  new TDF();
} );
