import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <body>
            <h1>Microsoft To Do</h1>
            <ul id={"toDoList"}>
            </ul>
            <form action={addTask()}>
                <input type={"text"} placeholder={"Nom de tâche"}/>
                <input type={"date"} placeholder={"Date"}/>
                <input type={"submit"} value={"Ajouter"}/>
            </form>
            </body>
        </div>
    );
}

function addTask() {
    let taskName = "oui";
    let taskDate = "non";
    let div = document.createElement("div");
    let pName = document.createElement("p");
    pName.textContent = taskName;
    let pDate = document.createElement("p");
    pDate.textContent = taskDate;
    div.appendChild(pName);
    div.appendChild(pDate);
    document.getElementById("toDoList").appendChild(div);
}

export default App;
