const express = require('express');
const routes = express.Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

routes.get('/movies', getMovies);
routes.post('/movies',celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom((value, helpers) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Неправильный формат ссылки');
      }
      return value;
    }),
    trailerLink: Joi.string().custom((value, helpers) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Неправильный формат ссылки');
      }
      return value;
    }),
    thumbnail: Joi.string().custom((value, helpers) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Неправильный формат ссылки');
      }
      return value;
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}),  createMovie);

routes.delete('/movies/:movieId', celebrate({
   params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = routes;