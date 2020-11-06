const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const Promise = require('bluebird');
const path = require('path');
const env = require('dotenv');
const PhotosRouting = require('./src/api/routes/photos')
env.config();


mongoose.connect(
    process.env.MONGO_URL || "mongodb+srv://bramh:<>@cluster0.w0hzi.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
);
mongoose.Promise = Promise;


app.use(helmet());
app.use(morgan('dev'));
app.use("/image",express.static('resources/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Routes which should handle requestsconfig
app.get('/favicon.ico', (req, res) => res.status(200));
app.get("/", (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write("It's Working");
    res.end();
});


app.use("/photo", PhotosRouting);


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 404);
    console.log(error);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;