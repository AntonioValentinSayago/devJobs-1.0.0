const mongose = require('mongoose')
require('dotenv').config( {path: '.env'} )

mongose.connect( process.env.DATABASE, {useNewUrlParser:true} );
mongose.connection.on(' error ', (error) => console.log(error))

// ? Importacion de los Modelos

require('../models/Usuarios')
require('../models/Vacantes')