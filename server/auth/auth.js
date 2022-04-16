const jwt = require('jsonwebtoken');
const configToken = require('../config/auth')

exports.isAuthenticated = function (req, res, next) {
    if(!req.headers.authorization) return res.status(403).send({message: "You d'ont have a authorization"});
    
    const tocken = req.headers.authorization.split(' ')[0];
    if(tocken === 'null') return res.status(403).send({message:"You d'ont have a authorization"});

    const payload = jwt.verify(tocken,configToken.SECRET_TOKEN);
    // console.log(payload);
    next();
}