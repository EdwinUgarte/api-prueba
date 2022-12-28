const { response } = require("express")
const jwt = require('jsonwebtoken')



const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
      return res.status(401).json({
        ok: false,
        msj: 'Error en el token, no tienes permisos para esta acción'
      })
    }

    try {
      const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
      req.uid  = uid;
      req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msj: 'token no valido'
        })
    }

    //All OK 
    next();

}

module.exports = {
    validarJWT
}