import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import './App.css';
import LandingScreen from './screens/LandingScreen/LandingScreen';
import TaskDetailScreen from './screens/TaskDetailScreen/TaskDetailScreen';
import TaskListScreen from './screens/TaskListScreen/TaskListScreen';
import TodoListScreen from './screens/TodoListScreen/TodoListScreen';

import { useState } from 'react';
import TestComponent from './components/TestComponent';
import TodoEditorScreen from "./screens/TodoEditor/TodoEditorScreen";

function App()
{
  const [screen, setScreen] = useState("landing");

  const navigate = (e) => {
    setScreen(e.target.id);
  }


  return (
    <>
      <div className="d-flex p-3 justify-content-center">
        <button className="btn btn-primary m-2" onClick={navigate} id="todolist">Todo List</button>
        <button className="btn btn-info m-2" onClick={navigate} id="tasklist">Task List</button>
        <button className="btn btn-secondary m-2" onClick={navigate} id="task">Task Detail</button>
        <button className="btn btn-warning m-2" onClick={navigate} id="edittodo">Edit</button>
        <button className="btn btn-danger m-2" onClick={navigate} id="landing">Retour landing</button>
        <button className="btn btn-outline-danger m-2" onClick={navigate} id="testOK">TEST</button>
      </div>

      <div className="App container">
        {screen === "landing" && <LandingScreen setScreen={setScreen}/>}
        {screen === "testOK" && <TestComponent setScreen={setScreen}/>}
        {screen === "todolist" && <TodoListScreen setScreen={setScreen}/>}
        {screen === "tasklist" && <TaskListScreen setScreen={setScreen}/>}
        {screen === "task" && <TaskDetailScreen setScreen={setScreen}/>}
        {screen === "edittodo" && <TodoEditorScreen setScreen={setScreen}/>}
      </div>

    </>    
  );
}

export default App;
