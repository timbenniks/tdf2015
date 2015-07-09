import reqwest from 'reqwest';

class get {

  static getLatestData(){

    var req = reqwest({
      url: '/all',
      type: 'json',
      method: 'get',
    });

    return req;
  }
}

module.exports = get;
