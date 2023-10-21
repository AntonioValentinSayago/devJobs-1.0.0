const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const router = require('./routes')

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

app.use('/' , router() )

app.listen(5000)