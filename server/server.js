const express = require('express');
const cors = require('cors');
const dataRouters = require('./controllers/router');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello world!");
})

app.use('/', dataRouters);




module.exports = app;
