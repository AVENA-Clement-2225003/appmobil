import logo from './logo.svg';
import './App.css';
import { useRef, useState, useEffect } from "react";
import Task from "./component/Task";

function App() {
    const [dummyState, setDummyState] = useState(0); // Dummy state to trigger rerender
    const todoListRef = useRef([]);
    const inputs = useRef([]);

    useEffect(() => {
        const storedTodoList = JSON.parse(localStorage.getItem('todoList'));
        if (storedTodoList) {
            todoListRef.current = storedTodoList;
            setDummyState(prevState => prevState + 1); // Trigger rerender
        }
    }, []);

    const addInput = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el);
        }
    }

    const updateTask = (taskId, newName, newDate) => {
        todoListRef.current = todoListRef.current.map(task => task.id === taskId ? { id:task.id, name:newName, date:newDate, done: task.done } : task);
        localStorage.setItem('todoList', JSON.stringify(todoListRef.current));
        setDummyState(prevState => prevState + 1); // Trigger rerender
    };

    const addTask = (e) => {
        e.preventDefault();
        const newTask = { name: inputs.current[0].value, date: inputs.current[1].value, id: todoListRef.current.length, done: false };
        todoListRef.current.push(newTask);
        localStorage.setItem('todoList', JSON.stringify(todoListRef.current));
        setDummyState(prevState => prevState + 1); // Trigger rerender
        clearInputs();
    }

    const clearInputs = () => {
        for (let i = 0; i < inputs.current.length; i++) {
            inputs.current[i].value = ""
        }
    }

    const deleteTask = (taskId) => {
        todoListRef.current = todoListRef.current.filter(task => task.id !== taskId);
        localStorage.setItem('todoList', JSON.stringify(todoListRef.current));
        setDummyState(prevState => prevState + 1); // Trigger rerender
    }

    const doneTask = (taskId) => {
        todoListRef.current = todoListRef.current.map(task => task.id === taskId ? { ...task, done: !task.done } : task);
        localStorage.setItem('todoList', JSON.stringify(todoListRef.current));
        setDummyState(prevState => prevState + 1); // Trigger rerender
    }

    return (
        <div className="App">
            <h1>Microsoft To Do</h1>
            <p>{todoListRef.current.filter(task => task.done === true).length}/{todoListRef.current.length} Tâches effectuées</p>
            <form onSubmit={addTask}>
                <input type={"submit"} value={"+"} />
                <input ref={addInput} type={"text"} placeholder={"Nom de tâche"} required />
                <input ref={addInput} type={"date"} placeholder={"Date"} required />
            </form>
            <ul id={"toDoList"}>
                {todoListRef.current.map((task, i) => (
                    <Task key={i} id={task.id} date={task.date} nom={task.name} done={task.done} onDelete={deleteTask} onChecked={doneTask} onUpdated={updateTask}/>
                ))}
            </ul>
        </div>
    );
}

export default App;
