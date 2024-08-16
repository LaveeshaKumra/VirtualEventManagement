const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Ensure that you have set the JWT_SECRET environment variable
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to log requests
const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next(); // Pass control to the next middleware function
};


// Middleware to check authentication and attach user to req
const authenticationMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send('Access denied.');

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token.');
        req.user = decoded; // Attach decoded user info to req
        next(); // Proceed to the next middleware or route handler
    });
};

// // Middleware to check if the user has the required role
const roleMiddleware = (requiredRole) => {
    console.log(requiredRole)
    return (req, res, next) => {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).send('Access denied.');
        }
        // Check if user has the required role
        console.log(req.user)
        if (req.user.role !== requiredRole) {
            return res.status(403).send('Forbidden: Insufficient role. You are not authorized to perform this action');
        }
        next(); // Proceed to the next middleware or route handler
    };
};

module.exports = {
    loggerMiddleware,authenticationMiddleware,roleMiddleware
};
