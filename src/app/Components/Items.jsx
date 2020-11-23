import React from 'react';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { getTasks, getData, remove, markAsChecked, checkAll, clearCompleted, all, todo, completed }  from '../todoSlice';
import { connect } from 'react-redux'
import { Input, Label } from 'reactstrap';

class Tasks extends React.Component {
    getMode() {
      return localStorage.getItem('mode')
    }

    getUncheckedCounter() {
      return this.fetchData().filter((e) => e.checked === false).length
    }

    getCheckedCounter() {
      return this.fetchData().filter((e) => e.checked === true).length
    }

    syncDB() {
      axios.get(`/todos`)
        .then(res => {
          const tasks = res.data;
          this.props.getData(tasks);
        })
    }

    componentDidMount() {
      this.syncDB()
    }

    handleMark = (id, check) => {
      this.props.markAsChecked([id, check])
      this.syncDB()
    }

    handleRemove = (id) => {
      this.props.remove(id)
      this.syncDB()
    }

    handleAll = () => {
      
      this.props.all()
      this.syncDB()
    }

    handleTodo = () => {
      this.props.todo()
      this.syncDB()
    }
    handleCompleted = () => {
      this.props.completed()
      this.syncDB()
    }

    fetchData() {
      return this.props.state.tasks
    }

    getLocalState() {
      return this.state.tasks
    }

    handleClearCompleted(){
      this.props.clearCompleted()
      this.syncDB()
    }

    handleCheckAll(b) {
      this.props.checkAll(b)
      this.syncDB()
    }
  
  render() {
    let mode = this.getMode() || null
    let posts
    switch (mode) {
      case "1":
        posts = this.fetchData().filter((e) => e.checked === false)
        break;
      case "2":
        posts = this.fetchData().filter((e) => e.checked === true)
        break;
      default:
        posts = this.fetchData()
        break;
    }
    if (this.getCheckedCounter() === 0 && this.getUncheckedCounter() ===0) {
      return null
    }
    
    return (
        <div>
          <ul id="ll" className="list-group list-group-flush">
            { posts.map(task =>
            <li className={"item list-group-item " + (task.checked ? 'crossed' : 'no-cross')} key={task.id}>
                        <div className=" promoted-checkbox">
              <input id={task.id} type="checkbox" className="promoted-input-checkbox" onClick={e=>
              {this.handleMark(task.id, !task.checked)}} defaultChecked={task.checked}/>
              <label htmlFor={task.id}>
                <svg>
                  <use xlinkHref='#checkmark' />
                </svg>
              </label>
        </div>
        <div className='text'>{task.text}</div>
        <div className="trash">
          <FontAwesomeIcon className="crossed" type="button" id="trash" onClick={()=> this.handleRemove(task.id)} icon={faTrashAlt} />
        </div>
        </li>
        )}
        </ul>

        <li id="last" className="list-group-item">
          <div id="btn-gr" className="btn-group btn-group-toggle">
            <i type='button' id="task_left" onClick={()=> this.handleCheckAll(this.getUncheckedCounter() > 0)}>{this.getUncheckedCounter()} Tasks left</i>
            <Label className={"center_btn radios btn btn-sm "+(!this.getMode() || this.getMode() === "0" ? "radio_clicked border border-second rounded" : "radio_unclicked" )}>              
              <Input type="radio" className="center_btn" id="option1" onClick={()=> this.handleAll()}/><p>All</p>
            </Label>
            <Label className={"center_btn radios btn btn-sm " +(this.getMode() === "1" ? "radio_clicked border border-second rounded" : "radio_unclicked" )}>              
              <Input type="radio" className="center_btn" onClick={()=> this.handleTodo()}/><p>ToDo</p>
            </Label>
            <Label id="btns" className={"center_btn radios btn btn-sm "+(this.getMode() === "2" ? "radio_clicked border border-second rounded" : "radio_unclicked" )}>              
              <Input type="radio" id="last_btn" className="center_btn" onClick={()=> this.handleCompleted()}/><p>Completed</p>
            </Label>
            <i type='button' id="clear" onClick={()=> this.handleClearCompleted()}>{this.getCheckedCounter() ? 'Clear completed': null}</i>
          </div>
        </li>
      </div>
    ) 
  }
}

function mapStateToProps(state, ownProps) {
    return {
        state: state,
        tasks: state.tasks
    };
}

export default connect( mapStateToProps , {getTasks, getData, remove, markAsChecked, checkAll, clearCompleted, all, todo, completed })(Tasks);