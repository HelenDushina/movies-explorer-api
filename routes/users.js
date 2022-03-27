const express = require('express');

const routes = express.Router();

const { celebrate, Joi } = require('celebrate');
// const validator = require('validator');
const { getMe, updateUser } = require('../controllers/users');

routes.get('/users/me', getMe);
routes.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = routes;
