const { response } = require("express");
const { validationResult } = require("express-validator");


const validarCampos = ( req, res = response, next ) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
          ok: false,
          msj: errors.mapped()
        })
      }

    //? next() es una funcion que nos indica que todo salio bien y pase al siguiente middleware
    next();


}

module.exports = {
    validarCampos
}