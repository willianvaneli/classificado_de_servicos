const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const morgan = require('morgan');
var user = require('./Models/anunciante');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(cors());
app.use(express.json());

app.use(routes);




app.listen(3333);