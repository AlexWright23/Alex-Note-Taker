const express = require('express');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const util = require('util');
const path = require('path');
const htmlRoute = require('./routes/html');
const apiRoute = require('./routes/api');



const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/', htmlRoute);
app.use('/', apiRoute);

app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);