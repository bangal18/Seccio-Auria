const connection = require('../config/db').connection;

exports.addUser = function (user) {
    try{
        return new Promise ((resolve, reject)=>{
            let sql = "INSERT INTO users (role_id, name, nickname, photo ,email, password, user_status) VALUES (?.?,?,?,?,?,?)";
            let values = [2,user.name,user.nickname,user.photo,user.email,user.password, 0]

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

exports.signUpGoogle = function (user) {
    try{
       let sql = "INSERT INTO users (role_id, name, nickname, photo ,email, password, tag_id, user_status) VALUES (?,?,?,?,?,?,?,?)";
       let values = [2,user.name,user.nickname,user.photo,user.email,user.password,1,0]

       return new Promise ((resolve, reject)=>{
        connection.query(sql, values, function (err, result,fields){
            if(err){ resolve({staus : 0, message : `${user.email} already exist.`}); return;}
            resolve( { status: 1,lastId: result.insertId } );
        });
    });

   }catch(error){
    console.log(error)
}
}