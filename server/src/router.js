const express = require('express');
const isLoggedIn = require('./middleware/isLoggedIn')

const createTodoRoute = require('./routes/createTodoRoute');
const readTodosRoute = require('./routes/readTodosRoute');
const updateTodoRoute = require('./routes/updateTodoRoute');
const deleteTodoRoute = require('./routes/deleteTodoRoute');
const readTodoRoute = require('./routes/readTodoRoute');

const router = express.Router();

//login route
router.post('/login', require('./routes/loginRoute'));

//todos routes including create, read, update, and delete
router.post('/todos', isLoggedIn, createTodoRoute);
router.get('/todos', isLoggedIn, readTodosRoute);
router.get('/todos/:id', isLoggedIn, readTodoRoute);
router.put('/todos/:id', isLoggedIn, updateTodoRoute);
router.delete('/todos/:id', isLoggedIn, deleteTodoRoute);



module.exports = router;