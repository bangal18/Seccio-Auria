
const { body,check, validationResult } = require('express-validator');
const validateCreate = [
    check('nickname').isEmpty(),
    check('name').isEmpty(),
    check('email').isEmpty().isEmail(),
    check('password').isEmpty().isLength({min : 8}).isStrongPassword(),
    check('confirmPassword').isEmpty().isLength({min : 8}).isStrongPassword()
]