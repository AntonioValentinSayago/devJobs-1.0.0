const mongoose = require('mongoose')
require('./config/db');

const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const router = require('./routes')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');

require('dotenv').config( {path: '.env'} );

const app = express();

// * Hbailitar handlebars como vista
app.engine('handlebars',
    exphbs.engine({
        defaultLayout: 'layout'
    })
);
app.set('view engine', 'handlebars');

// * Configuración de los archivos estaticos dle proyecto
app.use(express.static(path.join(__dirname, 'public')))

// ? No perder la conexion a Mongose se guarda la Cookie
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE })
}))

app.use('/' , router() )

app.listen(process.env.PUERTO)