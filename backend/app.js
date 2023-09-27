const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { enviornment } = require('./config');
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

module.exports = app;
