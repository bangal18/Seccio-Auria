const connection = require('../config/db').connection;
const globalFunctions = require('../global/globalFunctions');
const NEXT_X_NEWS = 3;

exports.addNews = function (news) {
    try{
        return new Promise ((resolve, reject)=>{
        	let date = globalFunctions.getDateTypeSQL();

            let sql = "INSERT INTO news (user_id, news_title, subtitle, main_cover ,news_text, creation_date, tag_id) VALUES (?,?,?,?,?,?,?)";
            let values = [news.userId,news.title,news.subTitle,`uploads\\${news.image}`,news.newsText,date,null]

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

exports.editNews = function (news){
    try{
       let date = globalFunctions.getDateTypeSQL();
       let sql = `UPDATE news SET user_id=?, news_title = ?,subtitle = ?, main_cover = ? ,news_text = ?, creation_date = ?, tag_id = ? WHERE id = ?`;        
       let values = [news.userId,news.title,news.subTitle,`uploads\\${news.image}`,news.newsText,date,null,news.id]

       return new Promise ((resolve, reject)=>{
        connection.query(sql, values, function (err, result,fields){
            if(err){ resolve({staus : 0, message : "Error database"}); return;}
            resolve( { status: 1,lastId: result } );
        });
    });

   }catch(err){
    console.log(err)
}
}

exports.getNewsById = function (id) {
	try{
        return new Promise ((resolve, reject)=>{
        	let date = globalFunctions.getDateTypeSQL();

            let sql = "SELECT * FROM news WHERE id = ?";
            let values = [id];
            connection.query(sql, values, function (err, result,fields){
                if(err){ resolve({staus : 0, message : "Error database"}); return;}
                resolve( { status: 1, content : result } );
            });
        });

    }
    catch(err){
        console.log(err)
    }

}

exports.getNewsByUserId = function (id) {
    try{
        return new Promise ((resolve, reject)=>{
            let date = globalFunctions.getDateTypeSQL();

            let sql = "SELECT * FROM news WHERE user_id = ? ORDER BY creation_date DESC";
            let values = [id];
            connection.query(sql, values, function (err, result,fields){
                if(err){ resolve({staus : 0, message : "Error database"}); return;}
                resolve( { status: 1, content : result } );
            });
        });

    }
    catch(err){
        console.log(err)
    }

}

exports.getNextXNews = function (index) {
    try{
        return new Promise((resolve, reject) =>{
            let sql = `SELECT * FROM news LIMIT ?,?`;
            let values = [index, NEXT_X_NEWS];
            connection.query(sql, values, function(err, result){
             if(err){ resolve({staus : 0, message :err}); return;}
             resolve( { status: 1, content : result } );
         })
        })

    }catch(err){
        console.log(err)
    }
}

exports.save = async function (user_id, news_id){
    try{
        return new Promise( (resolve, reject) => {
            let sql = "INSERT INTO saves (user_id,news_id) VALUES (?,?)";
            let values = [user_id, news_id];

            connection.query(sql,values, async (err, result)=>{
                if(err) {console.log("Error conection db"); resolve({status :0, message : "Error connecion"}); return;}
                resolve({ status: 1, data : result[0] });
            });

        });

    }catch(err){
        console.log(err)
    }
}

exports.unsave = async function (user_id, news_id){
    try{
        return new Promise( (resolve, reject) => {
            let sql = "DELETE FROM saves WHERE user_id = ? AND news_id = ?";
            let values = [user_id, news_id];

            connection.query(sql,values, async (err, result)=>{
                if(err) {console.log("Error conection db"); resolve({status :0, message : "Error connecion"}); return;}
                resolve({ status: 1, data : result[0] });
            });

        });

    }catch(err){
        console.log(err)
    }
}

exports.isSaved = async function (user_id, news_id){
    try{
       return new Promise( (resolve, reject) => {
        let sql = "SELECT COUNT(*) AS total FROM saves WHERE user_id = ? AND news_id = ? "
        let value = [user_id,news_id];

        connection.query(sql,value, async (err, result)=>{
            if(err) {console.log("Error conection db"); resolve({status :0, message : "Error connecion"}); return;}
            resolve({ status: 1, data : result[0] });
        });
    })

   }catch(err){
       console.log(err)
   }
}

exports.like = async function (user_id, news_id){
    try{
        return new Promise( (resolve, reject) => {
            let sql = "INSERT INTO likes (user_id,news_id) VALUES (?,?)";
            let values = [user_id, news_id];

            connection.query(sql,values, async (err, result)=>{
                if(err) {console.log("Error conection db"); resolve({status :0, message : "Error connecion"}); return;}
                resolve({ status: 1, data : result[0] });
            });

        });

    }catch(err){
        console.log(err)
    }
}

exports.unlike = async function (user_id, news_id){
    try{
        return new Promise( (resolve, reject) => {
            let sql = "DELETE FROM likes WHERE user_id = ? AND news_id = ?";
            let values = [user_id, news_id];

            connection.query(sql,values, async (err, result)=>{
                if(err) {console.log("Error conection db"); resolve({status :0, message : "Error connecion"}); return;}
                resolve({ status: 1, data : result[0] });
            });

        });

    }catch(err){
        console.log(err)
    }
}

exports.isLiked = async function (user_id, news_id){
    try{
     return new Promise( (resolve, reject) => {
        let sql = "SELECT COUNT(*) AS total FROM likes WHERE user_id = ? AND news_id = ? "
        let value = [user_id,news_id];

        connection.query(sql,value, async (err, result)=>{
            if(err) {console.log("Error conection db"); resolve({status :0, message : "Error connecion"}); return;}
            resolve({ status: 1, data : result[0] });
        });
    })

 }catch(err){
   console.log(err)
}
}

exports.deleteNewsById = async function (news_id){
    try{

     return new Promise( (resolve, reject) => {
        let sql = "DELETE FROM news WHERE id = ?";
        let value = [news_id];

        connection.query(sql,value, async (err, result)=>{
            if(err) {console.log("Error conection db"); resolve({status :0, message : "Error connecion"}); return;}
            resolve({ status: 1, data : result[0] });
        });
    })

 }catch(err){
    console.log(err)
}

}


exports.getSavesNews = async function (user_id){

    try{

     return new Promise( (resolve, reject) => {

        let sql = "SELECT n.* FROM news as n JOIN saves as s ON n.id = s.news_id WHERE s.user_id = ?";
        let value = [user_id];

        connection.query(sql,value, async (err, result)=>{
            if(err) {console.log(err); resolve({status :0, message : "Error connecion"}); return;}
            resolve({ status: 1, data : result });
        });
    })

 }catch(err){
    console.log(err)
}

}