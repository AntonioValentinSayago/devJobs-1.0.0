const mongoose = require('mongoose')
require('./config/db');

const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const router = require('./routes')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser')
// const expressValidator = require('express-validator')
const flash = require('connect-flash')
const passport = require('./config/passport')

require('dotenv').config( {path: '.env'} );

const app = express();

// ? Habilitar Body-parser
app.use(bodyParser.json())

// * Validacion de campos
// app.use(expressValidator());


// * Hbailitar handlebars como vista
app.engine('handlebars',
    exphbs.engine({
        defaultLayout: 'layout',
        helpers: require('./helpers/handlebars')
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

// * Inicializar passport
app.use(passport.initialize())
app.use(passport.session())

// ? Alertas y flash messages
app.use(flash())

// ? Crear nuestros propios Middleware
app.use(( req, res, next ) => {
    res.locals.mesajes = req.flash();
    next();
});

app.use('/' , router() )

app.listen(process.env.PUERTO)