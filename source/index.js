'use strict';

const express = require('express');
require('./database/mongoose.js'); //Automatycznie połączenie z bazą
const hbs = require('hbs');
const path = require('path');
const cookieParser = require('cookie-parser');
const routerUser = require('./routers/user.js');
const routerSolution = require('./routers/solution.js');
//Tworzenie aplikacji Express'a
const app = express();

//Parsowanie json requestow
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routerUser);
app.use(routerSolution);

//handlebars view engine
const pathViews = path.join(__dirname, '../templates/views');
const pathPartials = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', pathViews);
hbs.registerPartials(pathPartials);

//Udostepnianie plikow statycznych
const pathPublicDir = path.join(__dirname, '../public'); //Ścieżka do folderu public
app.use(express.static(pathPublicDir));

app.get('*', async (req, res) => {
  res.render('404page');
});

module.exports = app;
