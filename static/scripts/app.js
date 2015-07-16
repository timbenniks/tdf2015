import get from './get';
import header from '../../views/includes/header.jade';
import status from '../../views/includes/status.jade';
import groups from '../../views/includes/groups.jade';
import news from '../../views/includes/news.jade';

class TDF {
  constructor(){
    let today = new Date().getHours();

    if( today >= 11 && today <= 18 ){
      this.askForNews();
      this.askForStatus();
      this.bindRiderLinks();
    }
  }

  bindRiderLinks(){
    let links = document.querySelectorAll( '.show-riders' );

    [].forEach.call( links, ( link )=> {
      link.addEventListener( 'click', this.showRiders );
    });
  }

  unbindRiderLinks(){
    let links = document.querySelectorAll( '.show-riders' );

    [].forEach.call( links, ( link )=> {
      link.removeEventListener( 'click', this.showRiders );
    });
  }

  showRiders(){
    [].forEach.call( document.querySelectorAll( '.riders' ), ( riders )=> {
      riders.style.display = 'block';
    });
  }

  getData(){
    return get.getLatestData();
  }

  askForNews(){
    this.poll( 20000, ( data )=> {
      this.render( 'news', { appState: data.appState, newsItems: data.newsItems }, 'prepend' );
      this.askForNews();
    }, ()=> { this.askForNews(); } );
  }

  askForStatus(){
    this.poll( 20000, ( data )=> {
      this.render( 'status', { appState: data.appState, stageInfo: data.stageInfo, stageStatus: data.stageStatus } );
      this.render( 'groups', { appState: data.appState, stageInfo: data.stageInfo, stageStatus: data.stageStatus } );
      this.askForStatus();
    }, ()=> { this.askForStatus(); } );
  }

  poll( timeout, callback, onError ){
    setTimeout( ()=> {
      this.getData().then( callback ).catch( onError );
    }, timeout );
  }

  render( part, data, action ) {
    var html,
        selector;

    console.info( 'refreshing', part, data );

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
        if( part === 'groups' ){
          this.unbindRiderLinks();
        }

        selector.innerHTML = html;

        if( part === 'groups' ){
          this.bindRiderLinks();
        }
      }
    }
  }
}

require( 'domready' )( function(){
  new TDF();
} );
