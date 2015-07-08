import get from './get';
import header from '../../views/includes/header.jade';
import status from '../../views/includes/status.jade';
import groups from '../../views/includes/groups.jade';
import news from '../../views/includes/news.jade';

class TDF {
  constructor(){

    var that = this;

    this.poll( function( data ){
      console.log( 'refreshing' );
      that.render( 'header', { appState: data.appState, stageInfo: data.stageInfo } );
      that.render( 'status', { appState: data.appState, stageInfo: data.stageInfo, stageStatus: data.stageStatus } );
      that.render( 'groups', { appState: data.appState, stageStatus: data.stageStatus } );
      that.render( 'news', { appState: data.appState, newsItems: data.newsItems } );
    } );
  }

  getData(){
    return get.getLatestData();
  }

  poll( callback ){
    var that = this;

    setTimeout( function(){
      that.getData().then( callback );
      that.poll();
    }, 30000 );
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
