const { parse } = require("qs");

exports.FILTER_SANITIZE_STRING = function(params) {
    let clearParams = {};
    for (const key of params){
        let param = key.param[1].replaceAll(/\x00|<[^>]*>?/g, '');
        param = param.replaceAll('\'', '&#39;');
        param = param.replaceAll('"', '&#34;');
        if(!param) return {status : 0, message : `${key.param[0]} is empty`};
        
        clearParams[key.param[0]] = param;
    }
    return {status : 1, params : clearParams };
}


exports.randomVerficateCode = function () {
    let code = "";
    let pattern = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let index = 0; index < 5; index++) {
        let randomIndex = Math.floor((Math.random() * (pattern.length-1 )) + 0);
        code += pattern.charAt(randomIndex)
    }
    return code;
}

exports.getDateTypeSQL = function () {
    let ts = new Date();
    ts.setMinutes(ts.getMinutes() - ts.getTimezoneOffset());
    return ts.toISOString().slice(0, 19).replace('T', ' ');

}

exports.randomPassword = function (){
    let code = "";
    let pattern = "1234567890abcdefghijklmnopqrstuvwxyz1234568790ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    for (let index = 0; index < 20; index++) {
        let randomIndex = Math.floor((Math.random() * (pattern.length-1 )) + 0);
        code += pattern.charAt(randomIndex)
    }
    return code;

}