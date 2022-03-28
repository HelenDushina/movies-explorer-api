const express = require('express');

const routes = express.Router();

const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
}), login);
routes.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
}), createUser);

module.exports = routes;
