const { parse } = require("qs");

exports.FILTER_SANITIZE_STRING = function(params) {
    let clearParams = {};
    for (const key of params){
        let param = key.param[1].replaceAll(/\x00|<[^>]*>?/g, '');
        param = param.replaceAll('\'', '&#39;');
        param = param.replaceAll('"', '&#34;');
        if(!param) return {status : 0, whiteSpace : key.param[0]};
        
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


