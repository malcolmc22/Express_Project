const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { enviornment } = require('./config');
const { ValidationError } = require('sequelize');
const isProduction = enviornment === 'production';

const app = express();

const routes = require('./routes');

app.use(morgan('dev')); // Connect the morgan middleware for logging information about requests and responses
app.use(cookieParser()); // Connect cookie parser for parsing cookies
app.use(express.json()); // Connect express.json for parsing json bodies of requests with content-type "application/json"

// Security middleware

if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of header to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly:true
        }
    })
);

app.use(routes);

// Catch unhandled requets and forward to error handler.
app.use((req, res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

// Process seuqelize errors
app.use((err, req, res, next) => {
    // check if error is a sequelize rror:
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            errors[error.path] = error.message;
        }
        err.title = 'Validation error';
        err.errors = errors;
        delete err.stack
    }
    next(err);
})























// Error formatter

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title ,
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});
module.exports = app;
