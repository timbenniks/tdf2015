var gulp = require( 'gulp' ),
    config = require( '../config' ),
    sftp = require( 'gulp-sftp' );

gulp.task( 'deploy-uat', function(){
  gulp
    .src( config.dist + '/**/*' )
    .pipe(sftp({
      host: 'vmu-paris-app2',
      user: 'tim.benniks',
      pass: '[p@r1s1s@w3s0m3]',
      remotePath: '/home/tim.benniks/chance/',
      remotePlatform: 'unix'
    }));

});