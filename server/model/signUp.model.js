const connection = require('../config/db').connection;

exports.addUser = function (user) {
    console.log(user)
    connection.connect(function(err){
        if(err){ console.log("Error connection"); return; }
        let sql = "INSERT INTO users (role_id, name, nickname, photo ,email, password) VALUES (?,?,?,?,?,?)";
        let values = [2,user.name,user.nickname,null,user.email,user.password]
        connection.query(sql, values, function (err, result,fields){
            if(err) throw err;
            return { "code": 1, "lastId": result.insertId };
        })
    })
    connection.end();
}

