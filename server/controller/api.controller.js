let url = "http://api.mediastack.com/v1/news?access_key=c43029240cf8ba4b23f41e55116d5d8a&countries=es";
//api newsapi.org -> 5841f640b34c442cbd407779db44e597
const http = require('http');
const https = require('node:https');

exports.mediastack = function () {
  return new Promise( (resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => {
        data = JSON.parse(data);
        resolve(data)
      })
    }).on('error', err => {
      console.log(err.message);
    })
  })
}


exports.newsapi = function (){
  var url = 'https://newsapi.org/v2/everything?' +
  'q=Apple&' +
  'from=2022-05-11&' +
  'sortBy=popularity&' +
  'apiKey=5841f640b34c442cbd407779db44e597';

  return new Promise( (resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => {
        data = JSON.parse(data);
        resolve(data)
      })
    }).on('error', err => {
      console.log(err.message);
    })
  })

}