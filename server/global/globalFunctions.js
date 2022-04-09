const { parse } = require("qs");

exports.FILTER_SANITIZE_STRING = function(params) {
    let array = [];
    for (const key of params){
        let param = key.param[1].replaceAll(/\x00|<[^>]*>?/g, '');
        param = param.replaceAll('\'', '&#39;');
        param = param.replaceAll('"', '&#34;');
        if(!param) return {code : 1, whiteSpace : key.param[0]};
        array.push({
            key : key.param[0],
            value : param,
        })
    }
    return {code : 0, params : array };
}


exports.randomVerficateCode = function () {
    let code = "";
    for (let index = 0; index < 4; index++) {
        let randomIndex = Math.floor((Math.random() * (9 - 0 + 1)) + 0);
        code += randomIndex;
    }
    return parseInt(code) 
}