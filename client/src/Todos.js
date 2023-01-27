import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css'

function Todos() {

  const [allToDos, setAllToDos] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3003/tasks')
    .then((response) => {
      setAllToDos(response.data)
      console.log(allToDos)
    })
  }, [])

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const duration = 3600;
  const hours = Math.floor(duration/(60*60)-1);
  const minutes = Math.floor(duration / 60) -1;
  const seconds = Math.floor(duration - minutes * 60) - 1;
  
  const time = `${hours < 1 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`; 
  console.log(time)
  const currentDate = new Date()

return (
    <div>
      <table>
        <tr>
          <th>Id</th>
          <th>Todo</th>
          <th>created at</th>
          <th>priority</th>
          <th>status</th>
          <th>deadline</th>
          <th>time remained in hours</th>
        </tr>
        {allToDos.map((todo, ind) => {
          return (
            <tr key={ind}>
              <td>{ind + 1}</td>
              <td>{todo.value}</td>
              <td>{todo.created_at}</td>
              <td>{todo.priority}</td>
              <td>{todo.status}</td>
              <td>{todo.deadline}</td>
              <td>{(new Date(todo.deadline) - new Date())/ (1000 * 3600)}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default Todos