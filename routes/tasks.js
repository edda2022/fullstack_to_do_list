const express = require('express')
const taskRouter = express.Router()
const {getToDos, createToDo} = require('../controller/tasks')

taskRouter.get('/', getToDos)
taskRouter.post('/', createToDo)


module.exports = taskRouter