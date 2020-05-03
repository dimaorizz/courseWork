// Libs
require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const path = require('path');
// Routes
const homeRoute = require('./routes/homeRoute');
const branchesRoute = require('./routes/branches');
const clientsRoute = require('./routes/clients');
const carsRoute = require('./routes/cars');
const agentsRoute = require('./routes/agents');
const dealsRoute = require('./routes/deals');

const app = express(); // declaring express app
const PORT = process.env.PORT || 3000; // declaring default port
// connecting mongoose
require('./db');
// Middlewares
app.set('view engine', 'hbs') // setting view engine to handlebars
hbs.registerPartials(path.join(__dirname, 'partials'))
app.use(express.static(path.join(__dirname + '/client/'))) // setting static files path
app.use(express.json());
app.use(express.urlencoded( {extended: false }));
// Endpoints
app.use('/', homeRoute);
app.use('/branches', branchesRoute);
app.use('/clients', clientsRoute);
app.use('/cars', carsRoute);
app.use('/agents', agentsRoute);
app.use('/deals', dealsRoute);
// Listening requests on port 3000
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

module.exports = app;