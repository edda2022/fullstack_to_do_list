const express = require('express')
require("dotenv/config");
const app = express();
const {taskRouter} = require('./routes/tasks')

const PORT = 3003;
// console.log(process.env)

app.use(express.json());

app.use("/tasks", taskRouter)

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
})