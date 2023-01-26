const {pool} = require('../db')

// app.get
const getToDos = async (req, res)=>{
    try {
        const todo = await pool.query('select * from todos')
        res.json(todo.rows)
    } catch (err) {
        res.status(500).send(err)
    };
}

const createToDo = async (req, res)=>{
    try {
        const reqValue = req.body.req.inputToDo
        const todo = await pool.query('INSERT INTO todos (value) VALUES ($1) RETURNING*;',[reqValue])
        res.json(todo.rows)
    } catch (err) {
        res.status(500).send(err)
        console.log(err)
    };
}

module.exports = {
    getToDos,
    createToDo
}