var Slack = require( 'node-slack' ),
    slack = new Slack( 'https://hooks.slack.com/services/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' );

module.exports = function( data ){

  var emoji = '';

  switch( data.ev ){
    case 0: emoji = ':clock3:'; break;
    case 1: emoji = ':hospital:'; break;
    case 2: emoji = ':hocho:'; break;
    case 3: emoji = ':pushpin:'; break;
    case 4: emoji = ':collision:'; break;
    case 5: emoji = ''; break;
    case 6: emoji = ':point_right:'; break;
    case 7: emoji = ':bar_chart:'; break;
    case 8: emoji = ':point_right:'; break;
    case 9: emoji = ':signal_strength:'; break;
    case 10: emoji = ':mount_fuji:'; break;
    case 11: emoji = ':mount_fuji:'; break;
    case 12: emoji = ':mount_fuji:'; break;
    case 13: emoji = ':mount_fuji:'; break;
    case 14: emoji = ':mount_fuji:'; break;
    case 15: emoji = ':dash:'; break;
    case 16: emoji = ':clock3:'; break;
    case 17: emoji = ':busts_in_silhouette:'; break;
    case 18: emoji = ':wrench:'; break;
    case 19: emoji = ':signal_strength:'; break;
    case 20: emoji = ':point_right:'; break;
    case 21: emoji = ':point_right:'; break;
    case 22: emoji = ':muscle:'; break;
    case 23: emoji = ':muscle:'; break;
    case 24: emoji = ':muscle:'; break;
    case 25: emoji = ':mountain_bicyclist:'; break;
    case 26: emoji = ':no_good:'; break;
    case 27: emoji = ':clock3:'; break;
    case 28: emoji = ':clock3:'; break;
    case 29: emoji = ':clock3:'; break;
    case 30: emoji = ':clock3:'; break;
    case 31: emoji = ':bar_chart:'; break;
    case 32: emoji = ':dart:'; break;
    case 33: emoji = ':metal:'; break;
    case 34: emoji = ':fire:'; break;
    case 35: emoji = ':bicyclist:'; break;
    case 36: emoji = ':bicyclist:'; break;
    case 37: emoji = ':bicyclist:'; break;
    case 38: emoji = ':bicyclist:'; break;
    case 39: emoji = ':metal:'; break;
    case 40: emoji = ':checkered_flag:'; break;
    case 41: emoji = ':newspaper:'; break;
    case 42: emoji = ':microphone:'; break;
    case 43: emoji = ':point_up:'; break;
    case 44: emoji = ':book:'; break;
    case 45: emoji = ':birthday:'; break;
    case 46: emoji = ':construction:'; break;
    case 47: emoji = ':clock3:'; break;
    case 48: emoji = ':clock3:'; break;
  }

  var text = emoji + ' *' + data.title + '*' + ' - _ ' + data.readableTime + '_';

  slack.send({
    text: text,
    channel: '#random',
    username: 'Tour De France',
    attachments: [{
            "text": data.text,
            "color": "#e5e5e5"
        }
    ],
    unfurl_links: true,
    link_names: 1,
    icon_url: 'http://i.imgur.com/WsjMcFw.png'
  });
};