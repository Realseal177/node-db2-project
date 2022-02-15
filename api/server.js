const express = require("express")

const carsRouter = require('./cars/cars-router');

const server = express();

server.use(express.json());

server.use('/api/cars', carsRouter);

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server;
