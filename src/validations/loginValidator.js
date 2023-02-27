const {check, body} = require('express-validator');
const {readJSON} = require('../data');
const {compareSync} = require('bcryptjs');

module.exports = [

    check('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('El email tiene formato incorrecto'),

    body('pass')
    .notEmpty().withMessage('La contraseña es obligatoria').bail()
    .custom((value, {req}) =>{
        let user = readJSON('users.json').find(user => user.email === req.body.email && compareSync(value, user.pass));
        return user
    }).withMessage('Credenciales invalidas')

]