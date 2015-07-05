var Q = require( 'q' ),
    request = require( 'request' );

function getNews(){
  var deferred = Q.defer();
  
  request({
    method: 'GET',
    uri: 'http://www.letour.fr/le-tour/2015/us/live/aso/depeches/depeches-200-' + Math.floor( Math.random() * 100000000 ).toString() + '.html'
  }, 

  function( error, response, body ){
    if( response.statusCode === 200 ){
      deferred.resolve( body );

      //deferred.resolve( '<tr class="first DEP_239597 newa" id="239597"><td class="picto"><span class="picto picto-flm"></span></td><td class="time">17:33</td><td class="text"><span class="title">Greipel strikes in Zealand, Cancellara moves into the lead</span><strong><p>Stage 2 will make history in the 102nd Tour de France. Contested like a Spring classic in windy and wet conditions, it created significant differences between hot favorites for the overall classification. Chris Froome and Alberto Contador made the front group in which AndrÃ© Greipel proved to be the fastest against Peter Sagan and Mark Cavendish while Fabian Cancellara, third, moved into the lead. Vincenzo Nibali and Nairo Quintana lost 1.28.</p></strong><br><p>Armindo Fonseca (Bretagne-Séché Environnement) was the first attacker of the Tour de France as soon as race director Christian Prudhomme flagged off at the exit of Utrecht where 198 riders took the start of stage 2. Perrig Quémeneur (Europcar), Jan Barta (Bora-Argon 18) and Stef Clement (IAM Cycling) rejoined him. They got a maximum advantage of 2.45 at km 28 while Etixx-Quick Step took control of the chase straight away. Passed km 50, gusts of wind inspired Tinkoff-Saxo to create echelons. Until the intermediate sprint at Rotterdam (km 80.5), there was a lot of action, with the likes of Alejandro Valverde (Movistar) and Bauke Mollema (Trek) temporarily in trouble.<strong>Nibali, Quintana and many more in a pitfall</strong>Barta rode away solo in the streets of Rotterdam to win the intermediate sprint. The race was bunched up with 62km to go, preceding a series of accelerations. With 50km to go, the peloton was split into pieces. 26 riders including Chris Froome, Alberto Contador, Tejay van Garderen, Peter Sagan, Mark Cavendish, André Greipel, Tony Martin and Fabian Cancellara composed a front group while many top contenders couldnt avoid the pitfall. Vincenzo Nibali, Nairo Quintana, Thibaut Pinot and yellow jersey holder Rohan Dennis were forced to chase. Nibali had a flat tyre with 25km to go but made it back into the chasing group. Despite the combination of forces, they never came across to the leaders and conceded 1.28 on the finishing line.<strong>Greipel faster than Cavendish</strong>As Etixx-Quick Step outnumbered the other teams in the front group, Cavendish looked in the best position for the sprint on the causeway in Neeltje Jans but Marcel Sieberg led Greipel out at perfection and the German claimed his seventh stage victory at the Tour de France ahead of Peter Sagan. The Slovakian had a flat tyre with 12km to go but managed to be back in the first group. Third on the line, Fabian Cancellara deprived Tony Martin of the yellow jersey through the time bonus. He leads the Tour de France for the 29th time.</p></td></tr><tr class="first DEP_239587 newa" id="239587"><td class="picto"><span class="picto picto-liv"></span></td><td class="time">17:24</td><td class="text"><span class="title">Top 5 overall</span><p>GC ranking:</p><p>1. Fabian Cancellara</p><p>2. Tony Martin, at 0.03</p><p>3. Tom Dumoulin, at 0.06</p><p>4. Peter Sagan, at 0.33</p><p>5. Geraint Thomas, at 0.35</p></td></tr>' );

    }
    else {
      deferred.reject( response );
    }
  });

  return deferred.promise;
}

module.exports = getNews;