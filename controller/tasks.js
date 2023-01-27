const {pool} = require('../db')

// app.get
const getToDos = async (req, res)=>{
    try {
        const todo = await pool.query('SELECT * FROM todos')
        res.json(todo.rows)
    } catch (err) {
        res.status(500).send('Something went wrong while getting all todos')
    };
}

const createToDo = async (req, res)=>{
    try {
        const reqValue = req.body.req.inputToDo
        const todo = await pool.query('INSERT INTO todos (value) VALUES ($1) RETURNING*;',[reqValue])
        res.json(todo.rows)
    } catch (err) {
        res.status(500).send('Something went wrong while creating a todo')
    };
}

const getToDo = async (req, res, next) => {
    const {id} = req.params
    try {
        const todo = await pool.query('SELECT * FROM todos WHERE id=$1;', [id])
        res.json(todo.rows)
    } catch (err) {
        res.status(500).send('Something went wrong while getting this one todo')
        console.log(err)
    };
}

const updateToDo = async (req, res, next) => {
    const {value, status, deadline, priority, created_at} = req.body
    const {id} = req.params
    try {
        const todo = await pool.query('UPDATE todos SET value=$1, status=$2, deadline=$3, priority=$4, created_at=$5 WHERE id=$6 RETURNING*;', [value, status, deadline, priority, created_at, id])
        res.json(todo.rows)
    } catch (err) {
        res.status(500).send('Something went wrong while updating this one todo')
        console.log(err)
    };
}

const deleteToDo = async (req, res, next) => {
    const {id} = req.params
    try {
        const todo = await pool.query('DELETE FROM todos WHERE id=$1 RETURNING*;', [id])
        res.json(todo.rows)
    } catch (err) {
        res.status(500).send('Something went wrong while deleting this one todo')
        console.log(err)
    };
}


module.exports = {
    getToDos,
    createToDo,
    getToDo,
    updateToDo,
    deleteToDo
}