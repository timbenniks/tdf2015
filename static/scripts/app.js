import get from './get';
import header from '../../views/includes/header.jade';
import status from '../../views/includes/status.jade';
import groups from '../../views/includes/groups.jade';
import news from '../../views/includes/news.jade';

class TDF {
  constructor(){
    this.askForNews();
    this.askForStatus();
  }

  getData(){
    return get.getLatestData();
  }

  askForNews(){
    this.poll( 20000, ( data )=> {
      console.info( 'refreshing news', data.newsItems );

      this.render( 'news', { appState: data.appState, newsItems: data.newsItems }, 'prepend' );
      this.askForNews();
    } );
  }

  askForStatus(){
    this.poll( 20000, ( data )=> {
      console.info( 'refreshing status and groups', data.stageInfo, data.stageStatus );

      this.render( 'status', { appState: data.appState, stageInfo: data.stageInfo, stageStatus: data.stageStatus } );
      this.render( 'groups', { appState: data.appState, stageStatus: data.stageStatus } );
      this.askForStatus();
    } );
  }

  poll( timeout, callback ){
    setTimeout( ()=> {
      this.getData().then( callback );
    }, timeout );
  }

  render( part, data, action ) {
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

    if( selector ){
      if( action === 'prepend' ){
        selector.insertAdjacentHTML( "afterbegin", html );
      }
      else {
        selector.innerHTML = html;
      }
    }
  }
}

require( 'domready' )( function(){
  new TDF();
} );
