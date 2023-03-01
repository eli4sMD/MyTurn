const { connect } = require("mongoose");

const connectDB = async () =>{

    try {
        connect(process.env.MONGODB_URI)
        console.log('BD connected');

    } catch (err) {
        console.log(`Error al conectar la BD: ${err}`);
    }
}

module.exports = connectDB;