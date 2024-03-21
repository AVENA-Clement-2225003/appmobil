import logo from './logo.svg';
import './App.css';
import {useRef, useState} from "react";
import Task from "./component/Task";

function App() {
    const [todoList, setTodoList] = useState([]);
    const todo = localStorage;
    const inputs = useRef([]);

    const addInput = el => {
        if(el && !inputs.current.includes(el)){
            inputs.current.push(el);
        }
    }

    const addTask = (e) => {
        e.preventDefault();
        setTodoList([...todoList, {name:inputs.current[0].value, date:inputs.current[1].value, id: todoList.length, done:false}]);
        clearInputs();
    }

    const clearInputs = () => {
        for (let i = 0; i < inputs.current.length; i++) {
            inputs.current[i].value = ""
        }
    }

    const deleteTask = (taskId) => {
        setTodoList(todoList.filter(task => task.id !== taskId));
    }

    /*const updateTask = (taskId, name, date, done) => {
        setTodoList(todoList.map(task => task.id === taskId ? {name:name, date:date, id:task.id, done:done} : task))
    }*/

    const doneTask = (taskId) => {
        setTodoList(todoList.map(task => task.id === taskId ? {name:task.name, date:task.date, id:task.id, done:!task.done} : task));
    }


    return (
        <div className="App">
            <h1>Microsoft To Do</h1>
            <p>{todoList.filter(task => task.done === true).length}/{todoList.length} Tâches effectuées</p>
            <form onSubmit={addTask}>
                <input type={"submit"} value={"+"}/>
                <input ref={addInput} type={"text"} placeholder={"Nom de tâche"} required/>
                <input ref={addInput} type={"date"} placeholder={"Date"} required/>
            </form>
            <ul id={"toDoList"}>
                {todoList.map((task, i) => (
                    <Task key={i} id={task.id} date={task.date} nom={task.name} done={task.done} onDelete={deleteTask} onChecked={doneTask} /*onChange={updateTask()}*//>
                ))}
            </ul>
        </div>
    );
}


export default App;
