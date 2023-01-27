import './App.css';
import axios from 'axios';
import { useState } from 'react';
import Todos from './components/Todos';

function App() {
  const [inputToDo, setInputToDo] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  const [inputDeadline, setInputDeadline] = useState("");
  const [inputPriority, setInputPriority] = useState("");
  const [inputCreatedAt, setInputCreatedAt] = useState("");

  const [todosList, setTodosList] = useState("");

  const handleSubmit = ((e) => {
    e.preventDefault();
    axios.post('http://localhost:3003/tasks', {
      reqTodo: {inputToDo},
      reqStatus: {inputStatus},
      reqDeadline: {inputDeadline},
      reqPriority: {inputPriority},
      reqCreatedAt: {inputCreatedAt}
    })
    .then((response) => {
      console.log('add button clicked');
      })
    .catch((err) => {
      console.log(err);
      });
  })

  const handleChangeToDo = (event) => {
    setInputToDo(event.target.value);
    console.log(inputToDo);
  };
  const handleChangeStatus = (event) => {
    setInputStatus(event.target.value);
    console.log(inputStatus);
  };
  const handleChangeDeadline = (event) => {
    setInputDeadline(event.target.value);
    console.log(inputDeadline);
  };
  const handleChangePriority = (event) => {
    setInputPriority(event.target.value);
    console.log(inputPriority);
  };
  const handleChangeCreatedAt = (event) => {
    setInputCreatedAt(event.target.value);
    console.log(inputCreatedAt);
  };

  return (
    <div className='App'>
      <h2>Todos</h2>
      <form className='div-form'>
        <span className='input-fields'>
          <input type="text" value={inputToDo} onChange={handleChangeToDo} placeholder='type todo here'/>
          <input type="text" value={inputCreatedAt} onChange={handleChangeCreatedAt} placeholder='insert created date'/>
          <input type="text" value={inputPriority} onChange={handleChangePriority} placeholder='insert priority'/>
          <input type="text" value={inputStatus} onChange={handleChangeStatus} placeholder='insert status'/>
          <input type="text" value={inputDeadline} onChange={handleChangeDeadline} placeholder='insert deadline'/>
        </span>
        <button type="submit" value="Add" onClick={handleSubmit}>Add</button>
      </form>
      <Todos />
    </div>
  );
}
export default App;