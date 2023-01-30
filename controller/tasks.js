const { pool } = require("../db");

// app.get
const getToDos = async (req, res)=>{
    try {
        const todo = await pool.query('SELECT * FROM todos order by priority asc')
        res.json(todo.rows)
    } catch (err) {
        res.status(500).send('Something went wrong while getting all todos')
    };
}

const createToDo = async (req, res) => {
  try {
    const reqToDo = req.body.reqTodo.inputToDo;
    const reqStatus = req.body.reqStatus.inputStatus;
    const reqDeadline = req.body.reqDeadline.inputDeadline;
    const reqPriority = req.body.reqPriority.inputPriority;
    const reqCreatedAt = req.body.reqCreatedAt.inputCreatedAt;
    const todo = await pool.query(
      "INSERT INTO todos (value, status, deadline, priority, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING*;",
      [reqToDo, reqStatus, reqDeadline, reqPriority, reqCreatedAt]
    );
    res.json(todo.rows);
  } catch (err) {
    res.status(500).send("Something went wrong while creating a todo");
    console.log(err);
  }
};

const getToDo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await pool.query("SELECT * FROM todos WHERE id=$1;", [id]);
    res.json(todo.rows);
  } catch (err) {
    res.status(500).send("Something went wrong while getting this one todo");
    console.log(err);
  }
};

const updateToDo = async (req, res, next) => {
  const { value, status, deadline, priority, created_at } = req.body;
  const { id } = req.params;
  try {
    if(status === 'done' && value === false){
        const todo = await pool.query(
            "UPDATE todos SET status=$1 WHERE id=$2 RETURNING*;",
            [status, id]
          );
    } else {
        const todo = await pool.query(
      "UPDATE todos SET value=$1, status=$2, deadline=$3, priority=$4, created_at=$5 WHERE id=$6 RETURNING*;",
      [value, status, deadline, priority, created_at, id]
    );
}
    res.json(todo.rows);
  } catch (err) {
    res.status(500).send("Something went wrong while updating this one todo");
    console.log(err);
  }
};

const deleteToDo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await pool.query("DELETE FROM todos WHERE id=$1 RETURNING*;", [
      id,
    ]);
    res.json(todo.rows);
  } catch (err) {
    res.status(500).send("Something went wrong while deleting this one todo");
    console.log(err);
  }
};

module.exports = {
  getToDos,
  createToDo,
  getToDo,
  updateToDo,
  deleteToDo,
};
