const express = require('express');
const cors = require('cors');
const data = require('./json/data.json')
const dataRouters = require('./controllers/router')
const app = express();

app.use(cors());

app.get('/', (res, req) => {
    req.send("Hello world!");
})

//app.use('/', dataRouters);

module.exports = app;
