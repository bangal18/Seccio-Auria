let url = "http://api.mediastack.com/v1/news?access_key=c43029240cf8ba4b23f41e55116d5d8a&countries=es";
const http = require('http');

exports.getDataApi = function () {

    http.get(url, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => {
        data = JSON.parse(data);
        console.log(data);
      })
    }).on('error', err => {
      console.log(err.message);
    })
}