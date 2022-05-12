const db = require('../config/db').connection;
const NEXT_X_NEWS = 2;

exports.getUserByNicknameEmail = async function (nickname, email) {
    try{
        return new Promise((resolve, reject) => {

            let sql = "SELECT nickname, email FROM users WHERE nickname = ? OR email = ?";
            let value = [nickname, email];
            
            db.query(sql, value, async (err, result) => {
                if(err) {console.log("Error conection db") ;resolve({status: 0, message : "Error connecion"}); return;c}
                if (result.length == 0) {resolve({ status: 1, message: "Succesfuly" }); return; }
                if (result[0].nickname == nickname) resolve({ status: 0, message: "Nickname already exist" });
                else resolve({ status: 0, message: "Email already exist" })
            });
        });

    }catch(error){
        console.log(error);
    }

}

exports.getUserByNikname = async function (nickname) {
    try{
        return new Promise((resolve, reject) => {

            let sql = "SELECT * FROM users WHERE nickname = ?";
            let value = [nickname];
            
            db.query(sql, value, async (err, result) => {
                if(err) {console.log("Error conection db"); resolve({status :0, message : "Error connecion"}); return;}
                if (result.length == 0) {resolve({ status: 0, message: "Nickname or password incorrect" }); return; }
                resolve({ status: 1, user : result[0] });
            });
        });

    }catch(error){
        console.log(error);
    }
}


exports.getUserById = async function (id) {
    try{
        return new Promise((resolve, reject) => {

            let sql = "SELECT * FROM users WHERE id = ?";
            let value = [id];
            
            db.query(sql, value, async (err, result) => {
                if(err) {console.log("Error conection db"); resolve({status :0, message : "Error connecion"}); return;}
                if (result.length == 0) {resolve({ status: 0, message: "Nickname or password incorrect" }); return; }
                resolve({ status: 1, user : result[0] });
            });
        });

    }catch(error){
        console.log(error);
    }
}

exports.getFollowing = async function (id) {
    try{
        return new Promise( (resolve, reject) => {

            let sql = "SELECT COUNT(*) AS total FROM followers WHERE user_id = ? "
            let value = [id];

            db.query(sql,value, async (err, result)=>{
                if(err) {console.log("Error conection db"); resolve({status :0, message : "Error connecion"}); return;}
                resolve({ status: 1, data : result[0] });
            });

        });

    }catch(error){

    }
}

exports.getFollowers = async function (id) {
    try{
        return new Promise( (resolve, reject) => {

            let sql = "SELECT COUNT(*) AS total FROM followers WHERE follower_id = ? "
            let value = [id];

            db.query(sql,value, async (err, result)=>{
                if(err) {console.log("Error conection db"); resolve({status :0, message : "Error connecion"}); return;}
                resolve({ status: 1, data : result[0] });
            });

        });

    }catch(error){

    }
}

exports.follow = function (user_id, follower_id){
    try{
        return new Promise( (resolve, reject) => {
            let sql = "INSERT INTO followers (user_id,follower_id) VALUES (?,?)";
            let values = [user_id, follower_id];

            db.query(sql,values, async (err, result)=>{
                if(err) {console.log("Error conection db"); resolve({status :0, message : "Error connecion"}); return;}
                resolve({ status: 1, data : result[0] });
            });

        });

    }catch(error){
        console.log(error);
    }

}

exports.unfollow = function (user_id, follower_id){

    try{
        return new Promise( (resolve, reject) => {
            let sql = "DELETE FROM followers WHERE user_id = ? AND follower_id = ?";
            let values = [user_id, follower_id];

            db.query(sql,values, async (err, result)=>{
                if(err) {console.log("Error conection db"); resolve({status :0, message : "Error connecion"}); return;}
                resolve({ status: 1, data : result[0] });
            });

        });

    }catch(error){
        console.log(error);
    }
}


exports.isFollowing = async function(user_id, follower_id){
    return new Promise( (resolve, reject) => {

        let sql = "SELECT COUNT(*) AS total FROM followers WHERE user_id = ? AND follower_id = ? "
        let value = [user_id,follower_id];

        db.query(sql,value, async (err, result)=>{
            if(err) {console.log("Error conection db"); resolve({status :0, message : "Error connecion"}); return;}
            resolve({ status: 1, data : result[0] });
        });

    });
}


exports.updateUser = async function (user) {
    try{

        let sql = "UPDATE users SET name = ?, nickname = ?, photo = ? ,about_me = ? WHERE id = ?";
        let values = [user.name, user.nickname, user.photo, user.about_me, user.id];

        return new Promise( (resolve, reject) => {
            db.query(sql, values, async (err, result)=>{
                if(err) {console.log("Error conection db"); resolve({status: 0, message:"Error conection db"});}
                // console.log(result)
                resolve({ status: 1});
            });
        });

    }catch(error){
        console.log(error);
    }
}


exports.userExists = async function (nickname) {
    try{
        let sql = "SELECT nickname FROM users WHERE nickname = ?";
        let value = [nickname];

        return new Promise( (resolve, reject) => {

            db.query(sql, value, async (err, result)=>{
                if(err) {console.log("Error conection db"); resolve({status: 0, message:"Error conection db"});}
                resolve({ status: 1, data : result });
            });
        });

    }catch(error){
        console.log(error)
    }
}

exports.getUsersSearch = function (nickname){
    try{
        let sql = 'SELECT u.id, u.name, u.nickname, u.about_me, u.photo, u.email, t.name as tag FROM users as u '+ 
        'INNER JOIN tags as t '+ 
        'ON u.tag_id = t.id '+
        'WHERE nickname REGEXP CONCAT("^", ?)';

        let value = [nickname];

        return new Promise( (resolve, reject) => {

            db.query(sql, value, async (err, result)=>{
                if(err) {console.log("Error conection db"); resolve({status: 0, message:"Error conection db"});}
                resolve({ status: 1, result : result });
            });
        });

    }catch(error){
        console.log(error);
    }
}

exports.getUserByTag = function(tag, index){
    try{
    
        let sql = 'SELECT u.id, u.name, u.nickname, u.about_me, u.photo, u.email, t.name as tag FROM users as u '+ 
        'INNER JOIN tags as t '+ 
        'ON u.tag_id = t.id '+
        'WHERE u.tag_id = ? '+ 
        'LIMIT ?,?';
        index = parseInt(index)
        let value = [tag,index,NEXT_X_NEWS];

        if(tag == 1) {
            sql = 'SELECT u.id, u.name, u.nickname, u.about_me, u.photo, u.email, t.name as tag FROM users as u '+ 
            'INNER JOIN tags as t '+ 
            'ON u.tag_id = t.id ' +
            'LIMIT ?,?' ;
            value = [index, NEXT_X_NEWS];
        }
        return new Promise( (resolve, reject) => {

            db.query(sql, value, async (err, result)=>{

                if(err) {console.log("err"); resolve({status: 0, message:"Error conection db"});}
                resolve({ status: 1, result : result });
            });
        });

    }catch(error){
        console.log(error);
    }

}

exports.updatePassword = function (password, id){
    try{
        return new Promise ((resolve, reject)=>{
            let sql = `UPDATE users SET password = ? WHERE id = ?`;        
            let values = [password, id]

            db.query(sql, values, function (err, result,fields){
                if(err){ resolve({staus : 0, message : "Error database"}); return;}
                resolve( { status: 1,lastId: result.insertId } );
            });
        });

    }catch(err){
        console.log(err)
    }

}