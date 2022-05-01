const connection = require('../config/db').connection;

exports.addUser = function (user) {
    try{
        return new Promise ((resolve, reject)=>{
            let sql = "INSERT INTO users (role_id, name, nickname, photo ,email, password) VALUES (?,?,?,?,?,?)";
            let values = [2,user.name,user.nickname,user.photo,user.email,user.password]
        
            connection.query(sql, values, function (err, result,fields){
                if(err){ resolve({staus : 0, message : "Error database"}); return;}
                resolve( { status: 1,lastId: result.insertId } );
            });
        });
    
    }
    catch(err){
        console.log(err)
    }
}

