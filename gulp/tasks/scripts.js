var gulp = require( 'gulp' ),
    config = require( '../config' ),
    browserify = require( 'gulp-browserify' ),
    uglify = require( 'gulp-uglify' ),
    plumber = require( 'gulp-plumber' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    babelify = require( 'babelify' ),
    jadeify = require( 'jadeify' );

gulp.task( 'scripts', function(){
  gulp
    .src( config.dev + 'scripts/app.js' )
    .pipe( plumber() )
    .pipe( browserify( {
      insertGlobals: true,
      transform: [ 'babelify', 'jadeify' ],
      debug: true
    } ) )
    .pipe( sourcemaps.init({
        loadMaps: true
    } ) )
    .pipe( sourcemaps.write( './' ) )
    //.pipe( uglify() )
    .pipe( gulp.dest( config.dist + 'js' ) );

  gulp
    .src( config.dev + 'scripts/modernizr.js' )
    .pipe( gulp.dest( config.dist + 'js' ) );
});
