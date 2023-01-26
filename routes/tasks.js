const express = require('express')
const taskRouter = express.Router()
const {getToDos} = require('../controller/tasks')

taskRouter.get('/', getToDos)

module.exports = taskRouter