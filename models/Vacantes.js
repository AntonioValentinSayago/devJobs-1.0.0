const mongoose = require('mongoose')
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const slug = require('slug')
const shortid = require('shortid')

const vacantesSchema = new Schema({
    titulo:{
        type:String,
        required: 'El nombre de la vancante es Obligatorio',
        trim: true, // - Cortas los espacios en el nombre
    },
    empresa:{
        type:String,
        trim: true
    },
    ubicacion:{
        type:String,
        trim:true,
        required: 'La Ubicación es Obligatoria',
    },
    salario: {
        type: String,
        default: 0,
        trim:true
    },
    contrato: {
        type: String,
        trim:true
    },
    descripcion:{
        type: String,
        trim:true
    },
    url:{
        type: String,
        lowercase: true, // Convierte a minusculas el texto
    },
    skills: [String],
    candidatos: [{
        nombre: String,
        email: String,
        cv: String
    }]
})

vacantesSchema.pre('save', function (next) {
    // Creacion de la URL
    const url = slug(this.titulo);
    this.url = `${url}-${shortid.generate()}`
    next()
})

module.exports = mongoose.model('Vacante', vacantesSchema)