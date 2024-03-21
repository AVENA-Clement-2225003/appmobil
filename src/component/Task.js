import React from 'react';
import trashImg from '../assets/trash-svgrepo-com.svg';

class Task extends React.Component{
    constructor(props) {
        super(props);
        this.checkTask = this.checkTask.bind(this);
        this.delete = this.delete.bind(this);
    }
    checkTask() {
        this.props.onChecked(this.props.id);
    }
    /*update() {
        this.props.onChange(this.props.id, this.props.name, this.props.date, this.props.done);
    }*/
    delete(e) {
        e.preventDefault();
        this.props.onDelete(this.props.id);
    }
    render () {
        return (
            <li id={this.props.id} className={this.props.done ? 'active' : null}>
                <form onSubmit={this.delete}>
                    <input type={'checkbox'} onClick={this.checkTask}/>
                    <input type={'text'} className="Nom" defaultValue={this.props.nom}/>
                    <input type={'date'} className="Date" defaultValue={this.props.date}/>
                    <button value={'X'}><img src={trashImg}/></button>
                </form>
            </li>
        );
    }

}

export default Task;