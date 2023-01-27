const express = require('express')
require("dotenv/config");
const app = express();
const taskRouter = require('./routes/tasks')
app.use(express.json());

const cors = require('cors');
app.use(cors());

const PORT = 3003;
app.use("/tasks", taskRouter)

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to our To-Do-List</h1>`)
  })

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
})