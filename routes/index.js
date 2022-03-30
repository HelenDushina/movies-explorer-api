const express = require('express');

const routes = express.Router();

const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const authRoutes = require('./auth');

routes.use('/', authRoutes);
routes.use('/', auth, userRoutes);
routes.use('/', auth, moviesRoutes);

module.exports = routes;
