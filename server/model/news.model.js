const connection = require('../config/db').connection;
const globalFunctions = require('../global/globalFunctions');

exports.addNews = function (news) {
    try{
        return new Promise ((resolve, reject)=>{
        	let date = globalFunctions.getDateTypeSQL();

            let sql = "INSERT INTO news (user_id, news_title, subtitle, main_cover ,news_text, creation_date, tag_id) VALUES (?,?,?,?,?,?,?)";
            let values = [news.userId,news.title,news.subTitle,news.image,news.newsText,date,null]
        
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


exports.getNewsById = function (id) {
	try{
        return new Promise ((resolve, reject)=>{
        	let date = globalFunctions.getDateTypeSQL();

            let sql = "SELECT * FROM news WHERE user_id = ?";
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