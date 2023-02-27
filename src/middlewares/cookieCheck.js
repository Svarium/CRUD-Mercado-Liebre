module.exports = (req, res, next) =>{
    if(req.cookies.userMercadoLiebre){
        req.session.userLogin = req.cookies.userMercadoLiebre
    }

    next();
}