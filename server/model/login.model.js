const connection = require('../config/db').connection;


exports.loginGoogle = function (email){
	try{
        return new Promise((resolve, reject) => {

            let sql = "SELECT name, nickname, email, id, photo FROM users WHERE email = ?";
            let value = [email];
            
            connection.query(sql, value, async (err, result) => {
                if(err) {console.log("Error conection db") ;resolve({status: 0, message : "Error connecion"}); return;c}
                if (result.length == 0) {resolve({ status: 0, message: `${email} no exist` }); return; }
                else resolve({ status: 1, message: "Succesfuly", user : result[0] });
            });
        });

    }catch(error){
        console.log(error);
    }
}
