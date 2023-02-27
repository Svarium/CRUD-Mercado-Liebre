const {check, body} = require('express-validator');
const {readJSON} = require('../data');

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({min:2}).withMessage('Mínimo de dos letras').bail()
    .isAlpha('es-ES',{
        ignore : " "
    }).withMessage('Solo caracteres alfabéticos'),


    check('surname')
    .notEmpty().withMessage('El apellido es obligatorio').bail()
    .isLength({min:2}).withMessage('Mínimo de dos letras').bail()
    .isAlpha('es-ES',{
        ignore : " "
    }).withMessage('Solo caracteres alfabeticos'),



    body('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debe ingresar un mail válido').bail()
    .custom((value, {req}) => {
        let user = readJSON('users.json').find(user => user.email === value);
        return !user
    }).withMessage('el email ya se encuentra registrado'),



    check('pass')
    .notEmpty().withMessage('La contraseña es obligatoria').bail()
    .isLength({
        min: 6,
        max:12
    }).withMessage('Debe tener entre 6 y 12 caracteres'),



    body('pass2')
    .notEmpty().withMessage('Debes confirmar tu contraseña').bail()
    .custom((value, {req}) =>{
        if(value !== req.body.pass){
            return false
        }
        return true
    }).withMessage('Las contraseñas no coinciden'),

    body('bases')
    .custom((value, {req}) =>{
        if(value === ""){       
            return true
        }
        return false
    }).withMessage('Debes aceptar las bases y condiciones')

]