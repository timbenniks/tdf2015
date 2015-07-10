var express = require( 'express' ),
    path = require( 'path' ),
    favicon = require( 'serve-favicon' ),
    logger = require( 'morgan' ),
    cookieParser = require( 'cookie-parser' ),
    bodyParser = require( 'body-parser' ),
    app = express();

app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/news', require( './routes/news' ));
app.use( '/status', require( './routes/status' ));
app.use( '/riders', require( './routes/riders' ));
app.use( '/state', require( './routes/state' ));
app.use( '/all', require( './routes/all' ));
app.use( '/', require( './routes/index' ));

// catch 404 and forward to error handler
app.use( function( req, res, next ){
  var err = new Error( 'Not Found' );
  err.status = 404;
  next( err );
});

app.use( function( err, req, res, next ){
  res.status( err.status || 500 );
  res.render( 'error', {
    message: err.message,
    error: ( app.get( 'env' ) === 'development' ) ? err : {}
  });
});

module.exports = app;
