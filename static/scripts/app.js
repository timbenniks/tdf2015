/* globals console*/
import get from './get';
import header from '../../views/includes/header.jade';
import status from '../../views/includes/status.jade';
import groups from '../../views/includes/groups.jade';
import news from '../../views/includes/news.jade';

class TDF {
  constructor(){

    get.getLatestData().then( function( data ){
      this.render( 'news', data.newsItems );
    } );
  }

  render( part, data ) {
    var html,
        selector;

    switch( part ){
      case 'header':
        html = header( data );
        selector = document.querySelector( 'header' );
      break;

      case 'status':
        html = status( data );
        selector = document.querySelector( '.stage-status' );
      break;

      case 'groups':
        html = groups( data );
        selector = document.querySelector( '.groups' );
      break;

      case 'news':
        html = news( data );
        selector = document.querySelector( '.news-items' );
      break;
    }

    selector.innerHTML = html;
  }
}

require( 'domready' )( function(){
  new TDF();
} );
