const {validationResult} = require('express-validator');
const {readJSON, writeJSON} = require("../data");
const {hashSync} = require('bcryptjs')


module.exports = {
    register : (req,res) => {
        return res.render('register')
    },
    processRegister : (req,res) => {

        const errors = validationResult(req);
/* 
        return res.send(errors) */

        if(errors.isEmpty()){
            const users = readJSON('users.json');
            const {name, surname, email, pass} = req.body

            const newUser = {
                id : users.length ? users[users.length -1].id + 1 : 1,
                name : name.trim(),
                surname : surname.trim(),
                email : email.trim(),
                pass : hashSync(pass, 12),
                rol : 'user'
            }

        users.push(newUser)

        writeJSON('users.json', users);

        return res.redirect('/users/login')

        } else {
            return res.render('register', {
                errors : errors.mapped(),
                old : req.body
            })


        }

       
    },
    login : (req,res) => {
        return res.render('login')
    },
    processLogin : (req,res) => {
        const errors = validationResult(req);

        /* return res.send(errors) */


        if(errors.isEmpty()){

            const {id, name, rol} = readJSON('users.json').find(user => user.email === req.body.email)

            req.session.userLogin = {
                id,
                name, 
                rol
            };

            if(req.body.remember){
                res.cookie('userMercadoLiebre', req.session.userLogin, {maxAge: 1000*60})
            }

                       console.log(req.session);
            return res.redirect('/')
      

        } else {
            return res.render('login',{
                errors : errors.mapped(),
            })

        }
    },

    profile : (req, res) =>{
        return res.render('users/profile')
    },

    logout : (req, res) => {
        req.session.destroy();
        return res.redirect('/')
    }

}