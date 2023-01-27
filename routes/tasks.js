const express = require('express')
const taskRouter = express.Router()

const {getToDos, createToDo, getToDo, updateToDo, deleteToDo} = require('../controller/tasks')

taskRouter.route('/').get(getToDos).post(createToDo)
taskRouter.route('/:id').get(getToDo).put(updateToDo).delete(deleteToDo)

module.exports = taskRouter