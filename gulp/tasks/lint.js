var gulp = require( 'gulp' ),
    config = require( '../config' ),
    jshint = require( 'gulp-jshint' );

gulp.task( 'lint', function(){
  gulp
    .src( [ config.dev + 'scripts/*.js', config.dev + 'scripts/**/*.js', '!' + config.dev + 'scripts/helpers/*.js', '!' + config.dev + 'scripts/vendors/*.js', '!' + config.dev + 'scripts/modernizr.js' ] )
    .pipe( jshint() )
    .pipe( jshint.reporter( 'default' ) );
});
