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
            <th>To Do</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Deadline</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todosList.map((todo) => {
            const deadline = new Date(todo.deadline);
            const now = new Date();
            const oneHour = 60 * 60 * 1000; // One hour in milliseconds
            const timeLeft = deadline - now;
            return (
              <tr
                key={todo.id}
                style={{
                  backgroundColor:
                    todo.priority === 1
                      ? "red"
                      : todo.priority === 2
                      ? "yellow"
                      : "green",
                }}
              >
                <td>{todo.id}: {todo.value}</td>
                <td>{todo.priority}</td>
                <td>{todo.status}</td>
                <td>{todo.created_at}</td>
                <td>
                  {todo.deadline}
                </td>
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
