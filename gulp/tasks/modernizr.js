var gulp = require( 'gulp' ),
    config = require( '../config' ),
    uglify = require( 'gulp-uglify' ),
    modernizr = require( 'gulp-modernizr' );

gulp.task( 'modernizr', function(){
  gulp
    .src( [ config.dev + 'scripts/**/*.js' ] )
    .pipe( modernizr( {
      cache: true,
      options: [
        'setClasses',
        'html5shiv',
        'mq'
      ],
      tests: config.modernizr
    } ) )
    .pipe( uglify() )
    .pipe( gulp.dest( config.dist + 'js' ) );
});
