const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const session = require('express-session');
const app = express();

const rutas = require('./rutas/rutas');

//CONFIG (Templates y port)
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//CONFIG (Conexión BD y Sesiones)
app.use(morgan('dev'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'concesionario'
}, 'single'));
app.use(express.urlencoded({extended: true}));

// Rutas globales

app.use('/', rutas)

//Rutas (IMG, CSS)
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/webfonts', express.static(__dirname + 'public/webfonts'));
app.use('/Imagenes', express.static(__dirname + 'public/Imagenes'));
app.use('/js', express.static(__dirname + 'public/js'))

app.listen(app.get('port'), () => {
    console.log(`En el servidor ${app.get('port')}`)
});