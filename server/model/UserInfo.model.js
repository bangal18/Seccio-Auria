const db = require('../config/db').connection;

exports.getUserByNicknameEmail = async function (nickname, email) {
    try{
        return new Promise((resolve, reject) => {

            let sql = "SELECT nickname, email FROM users WHERE nickname = ? OR email = ?";
            let value = [nickname, email];
            
            db.query(sql, value, async (err, result) => {
                if (result.length == 0) {resolve({ status: 1, message: "Succesfuly" }); return; }
                if (result[0].nickname == nickname) resolve({ status: 0, message: "Nickname already exist" });
                else resolve({ status: 0, message: "Email already exist" })
            });
        });

    }catch(error){
        console.log(error);
    }

}

exports.getUserById = function (id) {

}

