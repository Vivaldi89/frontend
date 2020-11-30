import {  createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState =
{
  tasks: [],
  mode: Number(localStorage.getItem('mode')) || null
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  
  reducers: {
    
    add: (state, action) => {
      let x = Math.round(Math.random()*10000000000);
      let obj = {
        id: x,  
        text: action.payload,
        checked: false
      }
      let config = {
        headers: {
          'todo-token': localStorage.getItem('token') || null,
        }
      }
      if (!localStorage.getItem('mode')) {
        localStorage.setItem('mode', 0);
      }
      if (state.tasks.findIndex(el => el.text === obj.text) === -1){
        axios.post('/api/add', {id: obj.id, text: obj.text, checked: obj.checked}, config)
        return { ...state, tasks: [...state.tasks, obj] }
      }
      return state;
    },

    remove: (state, action) => {
      let config = {
        headers: {
          'todo-token': localStorage.getItem('token') || null,
        }
      }
      let id = action.payload; 
      axios.delete('/api/del/' + String(id), config);
      return { 
        ...state, 
        tasks: state.tasks.filter((item) => item.id !== id) 
      }
    },

    markAsChecked: (state, action) => {
      let id = action.payload[0];
      let checked = action.payload[1]
      axios.put('/api/update/'+String(id)+'/'+String(checked), {}, {
        headers: {
          'todo-token': localStorage.getItem('token'),
        }
      })
      let requiredIndex = state.tasks.findIndex(x => x.id === id)
      return {...state, tasks: [
        ...state.tasks.slice(0, requiredIndex),
        { id: id, text: state.tasks[requiredIndex].text, checked: checked},
        ...state.tasks.slice(requiredIndex+1)
      ]}
    },

    clearCompleted: state => {
      let config = {
        headers: {
          'todo-token': localStorage.getItem('token') || null,
        }
      }
      axios.delete('/api/delcompleted', config);
      return {
        ...state, 
        tasks: state.tasks.filter((el) => el.checked === false)
      }
    },

    checkAll: (state, action) => {
      let config = {
        headers: {
          'todo-token': localStorage.getItem('token') || null,
        }
      }
      if (action.payload > 0) {
        axios.put('/api/checkall', {}, config)
         return { 
           ...state, 
           tasks: [...state.tasks.map(( item, index ) => {
              return  { 
                ...item, 
                checked: true
              }
         })]}
      }
      else {
        axios.put('/api/uncheckall', {}, config)
        return { 
          ...state, 
          tasks: state.tasks.map(task => {
            return { 
              ...task, 
              checked: false 
            }
       })}
      }
    },

    all: state => {
      localStorage.setItem('mode', 0)
      return { ...state, mode: 0 }
    },

    todo: state => {
      localStorage.setItem('mode', 1)
      return { ...state, mode: 1 }
    },

    completed: state => {
      localStorage.setItem('mode', 2)
      return { ...state, mode: 2 }
    },
    
    getData: (state, action) => {
      const x = action.payload
      return { ...state, tasks: x }
    },
    
    
  }
});

export const { getData, add, remove, markAsChecked, checkAll, clearCompleted, all, todo, completed } = todoSlice.actions;

export default todoSlice.reducer;