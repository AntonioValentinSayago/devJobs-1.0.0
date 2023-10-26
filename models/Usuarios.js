const mongoose = require('mongoose')
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const bcrypt = require('bcrypt')

const usuariosSchema = new Schema({
    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim: true, // - Cortas los espacios en el nombre
    },
    nombre:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
        trim:true
    },
    token: String,
    expira: Date
})

// * Metodo para hashear los passwords
usuariosSchema.pre('save', async function(next) {
    // ? Si el password ya esta hasheado -> no se hace nada
    if (!this.isModified('password')) {
        return next() // * -> Deten la ejecucion y continua con el siguiente Middleware
    }

    // ? Si no está hasheado ->> ...
    const hash = await bcrypt.hash(this.password, 12)
    this.password = hash;
    next();
})

module.exports = mongoose.model('Usuarios', usuariosSchema)
