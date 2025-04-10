require('dotenv').config();
const express = require('express');
const dbTestRouter = require('./routes/dbtest');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();
const alunosRouter = require('./routes/alunos');
const clientesRouter = require('./routes/clientes');
const produtosRouter = require('./routes/produtos');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/dbtest', dbTestRouter);
app.use('/alunos', alunosRouter);
app.use('/clientes', clientesRouter);
app.use('/produtos', produtosRouter);

module.exports = app;