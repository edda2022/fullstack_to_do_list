import moment from 'moment'
import React, { useState, useEffect } from "react";
import axios from "axios";

function Todos() {
  const [todosList, setTodosList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3003/tasks");
        setTodosList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = (e) => {
    const id = e.target.value;
    axios
    .delete(`http://localhost:3003/tasks/${id}`)
        .then((response) => {
            alert(`todo with id${id} deleted`)
        })
        .catch((err) => {
            console.log(err);
        })
 };

 const handleChange = () => {};

 const handleDone = (e) => {
  const id = e.target.value;
  axios.put(`http://localhost:3003/tasks/${id}`, {
    status: 'done',
  })
    .then((response) => {
    console.log(response.data)
    alert(`todo with id${id} was marked as done`)
    })
  .catch((err) => {
    console.log(err);
    });
 };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>To Do</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Deadline</th>
            <th>Time Left</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todosList.map((todo) => {
            const now = moment(new Date());
            const deadline = moment(new Date(todo.deadline));
            const timeDifferenceInMinutes = deadline.diff(now, 'minutes');
            
            const numDays = Math.floor(timeDifferenceInMinutes / 1440);
            const numHours = Math.floor((timeDifferenceInMinutes % 1440) / 60);
            const numMinutes = Math.floor((timeDifferenceInMinutes % 1440) % 60);
            //const timeLeft = numDays + " day(s) " + numHours +"h " + numMinutes +"m";
            const timeLeft = `${numDays} day(s) ${numHours} hr ${numMinutes} mins`;

            return (
              <tr
                key={todo.id}
                style={{
                  backgroundColor:
                  numDays < 0 || numHours < 0 || numMinutes < 0
                  ? "yellow"
                  : numDays === 0 && numHours < 1
                  ? "red"
                  : "green",
                }}
              >
                <td>{todo.id}</td>
                <td>{todo.value}</td>
                <td>{todo.priority}</td>
                <td>{todo.status}</td>
                <td>{moment().format('YYYY-MM-DD')}</td>
                <td>{moment(todo.deadline).format('YYYY-MM-DD')}</td>
                <td>{timeLeft}</td>
                <td>
                  <button className="button" onClick={handleDelete} value={todo.id}>DEL</button>
                  <button className="button" onClick={handleDone} value={todo.id}>DONE</button>
                  <button className="button" onClick={handleChange}value={todo.id}>CHANGE</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Todos;
