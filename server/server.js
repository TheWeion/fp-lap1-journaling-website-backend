const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (res, req) => {
    req.send("Hello world!");
})

module.exports = app;
