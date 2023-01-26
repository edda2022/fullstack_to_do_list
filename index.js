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
    res.send('hi There')
  })

// app.post('/', (req, res) => {
//     console.log(req.body)
//     res.send(req.body)
// })



app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
})