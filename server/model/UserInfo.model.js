const connection = require('../config/db').connection;


exports.getUserByNicknameEmail = async function (nickname, email, callback) {
    connection.connect( (req, res) => {
        let sql = "SELECT nickname, email FROM users WHERE nickname = ? OR email = ?";
        let value = [nickname, email];
        connection.query(sql,value, async (err, result) => {
            if(err){
                
                callback({code:err.code, message:"Filed to connect to bd"});
            } else{
               
               
                callback(result);
              
            }
           
        });
        // connection.end( (err) => {
        //     if(err) {console.log("Error ending the connection:",err);}
        // });

    })
    

}

exports.getUserById = function (id) {

}

