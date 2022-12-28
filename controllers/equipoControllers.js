const { generarJWT } = require("../helpers/jwt");
const Equipo = require("../models/Equipo");
const { response } = require("../routes/equipos");

const obtenerEquipos = async (req, res = response) => {
  try {
    let equipos = await Equipo.find().exec();

    res.status(200).send({ equipos });
  } catch (error) {
    res.status(500).send({ msj: "Error al encontrar equipos" });
  }
};


const buscarEquipo = async(req, res = response) => {
    
    try {
        const id = req.params.id;
        const equipo = await Equipo.findById(id);
        
        res.status(200).send(equipo);

    } catch (error) {
        res.status(404).send({msj: 'El equipo no se pudo encontrar'})
    }

}

const crearEquipo = async (req, res = response) => {
  const { name, pais } = req.body;

  const equipo = await Equipo.findOne({ name: name });

  try {
    if (equipo) {
      return res.status(401).send({ msj: "El equipo ya existe" });
    }

    const dbEquipo = new Equipo(req.body);

    

    await dbEquipo.save();

    res.json({
      status: "ok",
      name: dbEquipo.name,
      pais: dbEquipo.pais
    });
  } catch (error) {
    res.status(500).send({ msj: "Por favor comuniquese con el administrador" });
  }
};

const updateEquipo = async (req, res = response) => {
  try {
    let id = req.params.id;
    let update = req.body;
    const equipo = await Equipo.findByIdAndUpdate(id, update);

    res.status(200).send({
      ok: true,
      equipo,
    });

  } catch (error) {
    res.status(404).send({msj: 'El equipo no se actualizo'})
  }
};

 const deleteEquipo = (req, res = response) => {


        let id = req.params.id;
        Equipo.findOneAndDelete(id , (err, equipo) => {
            if(err)res.status(500).send({msj: 'El equipo no se elimino, contacta a soporte'})
            

            equipo.remove((err) => {
                if(err)res.status(500).send({msj: 'El equipo no se elimino, contacta a soporte'})
                res.status(200).send({msj: 'El equipo se elimino correctamente'});
            });
        });


    
    

 }





module.exports = {
  obtenerEquipos,
  crearEquipo,
  updateEquipo,
  deleteEquipo,
  buscarEquipo
};
