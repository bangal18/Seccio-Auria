var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'projecte',
  user     : 'root',
  password : '', 
});

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("DB Connected!");
// });

exports.connection = connection;