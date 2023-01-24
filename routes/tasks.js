const express = require('express')
const taskRouter = express.Router()

taskRouter.get('/', (req, res) => {
    res.send('Hi there')
})

module.exports =  {
    taskRouter
}