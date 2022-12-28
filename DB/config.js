const mongoose = require("mongoose");



//? Conexion con la base de datos de MongoDB
const dbConnection = async() => {


    try {
        
       await mongoose.connect(process.env.DB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
       });

       console.log('Base de datos online');

    } catch (error) {
        console.log(error);
    }


}



module.exports = {
    dbConnection
}