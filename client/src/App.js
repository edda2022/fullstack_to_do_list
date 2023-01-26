import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [inputToDo, setInputToDo] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    axios
    .post("http://localhost:3003/", { req: inputToDo })
    .then((res) => {
      console.log('add button clicked');
    });
  }

  const handleChange = (event) => {
    setInputToDo(event.target.value);
    console.log(inputToDo);
  };

  return (
    <div>
      <form>
        <span>
          <input type="text" value={inputToDo} onChange={handleChange} placeholder='type todo here'/>
        </span>
        <button type="submit" value="Add" onSubmit={handleSubmit}>Add</button>
      </form>
    </div>
  );
}
export default App;