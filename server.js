const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// middleware
app.use(express.json());
// app.use(cors());
app.use(express.urlencoded());

const routes = require('./controllers/router')
app.use('/status', routes);
app.get('/', (req, res) => {
    res.send('Hello world');
})

app.use('/', routes);

module.exports = app;
