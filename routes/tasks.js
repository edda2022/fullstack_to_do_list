const express = require('express')
const taskRouter = express.Router()
const {getToDos, createToDo, deleteToDo} = require('../controller/tasks')

taskRouter.get('/', getToDos)
taskRouter.post('/', createToDo)
taskRouter.delete('/:id', deleteToDo)

module.exports = taskRouter