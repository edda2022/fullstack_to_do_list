const {pool} = require('../db')

// app.get
const getToDos = async (req, res)=>{
    try {
        const todo = await pool.query('select * from todos order by priority asc')
        res.json(todo.rows)
    } catch (err) {
        res.status(500).send(err)
    };
}

const createToDo = async (req, res)=>{
    try {
        const reqToDo = req.body.reqTodo.inputToDo
        const reqStatus = req.body.reqStatus.inputStatus
        const reqDeadline = req.body.reqDeadline.inputDeadline
        const reqPriority = req.body.reqPriority.inputPriority
        const reqCreatedAt = req.body.reqCreatedAt.inputCreatedAt
        const todo = await pool.query('INSERT INTO todos (value, status, deadline, priority, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING*;',[reqToDo, reqStatus, reqDeadline, reqPriority, reqCreatedAt])
        res.json(todo.rows)
    } catch (err) {
        res.status(500).send(err)
        console.log(err)
    };
}

const deleteToDo = async(req, res) => {
    try {
        const {id} = req.params
        const toDoToDelete = await pool.query (`delete from todos where id=$1`, [id])
        res.json(toDoToDelete)
    } catch (err) {
        res.status(500).send(err)
    };
}

module.exports = {
    getToDos,
    createToDo,
    deleteToDo
}