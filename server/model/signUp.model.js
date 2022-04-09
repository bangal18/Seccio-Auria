const connection = require('../config/db').connection;

exports.addUser = function () {
    connection.connect(function(err){
        if(err) console.log("Error connection");
        
        connection.query("SELECT * FROM news", function (err, result,fields){
            if(err) console.log("Error");
            console.log(result)
        })
        connection.end();
      
    })
}