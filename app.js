const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const routes = require('./routes/index');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3001, NODE_ENV, DB_ADRESS } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/', routes);

app.use(auth, () => {
  throw new NotFoundError('Страница по указанному маршруту не найдена');
});

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

async function main() {
  // подключаемся к серверу mongo
  await mongoose.connect(NODE_ENV === 'production' ? DB_ADRESS : 'mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await app.listen(PORT);
}

main();
