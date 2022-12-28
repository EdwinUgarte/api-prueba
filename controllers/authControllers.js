const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { default: mongoose, model } = require("mongoose");


//? OBTENER USUARIOS
const obtenerUsuarios = async(req, res = response) => {
  try {
    let usuarios = await Usuario.find().exec();
    
    res.status(200).send({usuarios})
    
  } catch (error) {
    
    res.status(500).json({
      ok: false,
      mensaje: 'Registros no encontrados'
  
    })
  }


}



//? CREAR USUARIO CONTROLLER

const crearUsuario = async (req, res = response) => {
  // req.body -> nos da lo que envia el cliente en la peticion
  const { email, name, password } = req.body;

  try {
    // Verificar el email, lo busca en la base de datos
    const usuario = await Usuario.findOne({ email: email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msj: "El usuario ya existe con ese email",
      });
    }

    // Crear usuario con el modelo
    const dbUser = new Usuario(req.body);

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    dbUser.password = bcrypt.hashSync(password, salt);

    // Generar JSON web Token
    const token = await generarJWT(dbUser.id, dbUser.name);

    // Crear usuario de BD
    await dbUser.save();

    // Generar respuesta exitosa

    return res.status(201).json({
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msj: "Por favor hable con el administrador",
    });
  }
};

//? BUSCAR POR ID

const buscarPorId = async(req, res = response) => {
  let id = req.params.id;

  try {
    let usuario = await Usuario.findById(id)
    res.status(200).json({usuario})
  } catch (error) {
    res.status(500).send({msj: 'No se encontro'})
  }
}

//? ACTUALIZAR USUARIO CONTROLLER
const updateUsuario = async(req, res = response) => {
  
  try {
    let id = req.params.id;
    let update = req.body;
    const usuario = await Usuario.findByIdAndUpdate(id, update);
    res.status(200).send(usuario)

  } catch (error) {
    res.status(404).send({msj: 'El usuario no fue encontrado'})
  }

}


//? ELIMINAR USUARIO

const deleteUser = (req, res = response) => {

  let id = req.params.id;

  Usuario.findById(id, (err, usuario) => {
    if(err) res.status(500).send({msj: 'No se pudo borrar el usuario'})

    usuario.remove(err => {
      if(err)  res.status(500).send({msj: 'No se pudo borrar el usuario'})
      res.status(200).send({msj: 'El usuario se elimino correctamente'});
    })

  })

}

//? LOGIN USUARIO CONTROLLER

const loginUsuario = async(req, res = response) => {
  const { email, password } = req.body;

  try {

    //Validar email
    const dbUser = await Usuario.findOne({email: email})

    if(!dbUser){
      return res.status(400).json({
        ok: false,
        msj: 'email no valido'
      })
    } 

    // confirmar si el password hace match
    const validPassword = bcrypt.compareSync(password, dbUser.password);

    if(!validPassword){
      return res.status(400).json({
        ok: false,
        msj: 'password no valido'
      })
    }

     // Generar JSON web Token
     const token = await generarJWT(dbUser.id, dbUser.name);

     //respuesta del servicio
     return res.json({
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      token: token
     })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msj: "hable con el administrador",
    });
  }
};


//? REVALIDAR TOKEN

const revalidarToken = async(req, res = response) => {

  const {uid, name} = req;

  const token = await generarJWT(uid, name)

  return res.json({
    ok: true,
    msj: "renew",
    uid: uid,
    name: name,
    token: token
  });
};








module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
  obtenerUsuarios,
  updateUsuario,
  deleteUser,
  buscarPorId
};
