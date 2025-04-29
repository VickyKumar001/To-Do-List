import './App.css';
import { useState } from 'react';
import { tabs } from './Data/tabs';

function App() {
  let [todolist, setToDoList] = useState([]);

  
  let [activeTab, setActiveTab] = useState(0);
  let [activeContent, setActiveContent] = useState(tabs[activeTab]);


  let saveToDoList = (event) => {
    event.preventDefault();
    let task = event.target.task.value;
    // alert(task);

    if (todolist.includes(task)) {
      alert("Task already exists");
    } else {
      setToDoList([...todolist, task]);
    }
    event.target.reset();  // optional: to clear input after adding
  }

  let list = todolist.map((value, index) => {
    return (
      <ToDoList key={index} value={value} indexNumber={index} setToDoList={setToDoList} todolist={todolist} />
    );
  });

  return (
    <div className="App">

      <div className='tabsouter'>
        <h1 style={{ textAlign: "left" }}>
          Law prep Vision Misson and Goals
        </h1>

        <ul>
          {tabs.map((item, index) => {
            return (
              <li key={index}>
                <button className={(activeTab === index) ? "activateButton" : ""} onClick={() => { setActiveTab(index); setActiveContent(item) }}>{item.title}</button>
              </li>
            );
          })}
        </ul>

        {
          activeContent !== undefined ?
            <p>
              {activeContent.description}
            </p>
            :
            ""

        }

      </div>



      <h1>To Do List</h1>
      <form onSubmit={saveToDoList}>
        <input type="text" placeholder="Enter a task" name="task" />
        <button type="submit">Add</button>
      </form>

      <div className="list">
        <ul>
          {list}
        </ul>
      </div>
    </div>
  );
}

export default App;

function ToDoList({ value, indexNumber, setToDoList, todolist }) {

  let [status, setStatus] = useState(false);
  let deleteTask = () => {
    let finalList = todolist.filter((item, index) => index !== indexNumber);
    setToDoList(finalList);

  }

  let completeTask = () => {
    setStatus(!status);
  }
  return (
    <li className={(status) ? "completed" : ""} onClick={completeTask}>{indexNumber + 1}. {value} <span onClick={deleteTask}>  &times; </span> </li>
  );
}
