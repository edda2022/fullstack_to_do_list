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

module.exports = {getToDos}