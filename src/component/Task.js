import React, {useState} from 'react';
import trashImg from '../assets/trash-svgrepo-com.svg';
import checkImg from '../assets/pen-square-svgrepo-com.svg';
import Calendar from 'react-calendar'
import calendarImg from "../assets/calendar-days-svgrepo-com.svg";

class Task extends React.Component{

    constructor(props) {
        super(props);
        this.checkTask = this.checkTask.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.state = {
            showCalendar: false
        };
    }

    toggleCalendar = () => {
        this.setState(prevState => ({
            showCalendar: !prevState.showCalendar
        }));
    };

    update = (event) => {
        event.preventDefault();
        const newName = event.target.parentNode.querySelector('.Nom').value;
        const newDate = event.target.parentNode.querySelector('.Date').value;
        this.props.onUpdated(this.props.id, newName, newDate);
    };
    checkTask() {
        this.props.onChecked(this.props.id);
    }
    delete(e) {
        e.preventDefault();
        this.props.onDelete(this.props.id);
    }
    render () {
        return (
            <>
                <li id={this.props.id} className={this.props.done ? 'active' : null}>
                    <form onSubmit={this.update}>
                        <input type={'checkbox'} onClick={this.checkTask} />
                        <input type={'text'} className="Nom" defaultValue={this.props.nom} />
                        <input type={'date'} className="Date" value={this.props.date}/>
                        <img className={'CalendarIcon'} src={calendarImg} onClick={this.toggleCalendar}/>
                        <button type="submit"><img src={checkImg} alt="Update" /></button>
                    </form>
                    <button onClick={this.delete}><img src={trashImg} alt="Delete" /></button>
                </li>
                {this.state.showCalendar && <Calendar id='Calendar' className={'default'} defaultValue={this.props.date}/>}
            </>
        );
    }
}

export default Task;