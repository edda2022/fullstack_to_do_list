const express = require('express')
require("dotenv/config");
const app = express();
const taskRouter = require('./routes/tasks')

const cors = require('cors');
app.use(cors());

const PORT = 3003;

app.use(express.json());

app.get('/', (req, res) => {
    res.send(req)
  })

app.post('/', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

app.use("/tasks", taskRouter)


app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
})