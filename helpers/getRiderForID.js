module.exports = function( riders, id ){
 var r;

 riders.forEach( function( rider ){
    if( rider.n === id ){
      r = rider;
    }
  } );

  return r;
};
