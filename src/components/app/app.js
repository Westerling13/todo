import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink cup of tea'),
      this.createTodoItem('Make awesome app'),
      this.createTodoItem('Have a lunch')
    ]
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      hide: false,
      id: this.maxId++
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: todoData.filter((el) => el.id !== id) };
    });
  };

  addItem = (text) => {
    this.setState(({ todoData }) => {
      let newItem = this.createTodoItem(text);

      let newData = [ ...todoData, newItem ];

      return {
        todoData: newData
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id ===id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onSearch = (text) => {
    const hide = (el, value = true) => {
      el.hide = value;
      return el;
    };

    this.setState(({ todoData }) => {
      if (text === '') {
        const newData = todoData.map((el) => hide(el, false));
        return {
          todoData: newData
        };
      } else {
        const newData = todoData.map( (el) => el.label.includes(text) ? hide(el, false) : hide(el) );
        return {
          todoData: newData
        };
      }
    });
  };

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className='todo-app'>
        <AppHeader toDo={ todoCount } done={ doneCount }/>
        <div className='top-panel d-flex'>
          <SearchPanel onSearch={ this.onSearch } />
          <ItemStatusFilter />
        </div>
        <TodoList
          todos={ this.state.todoData }
          onDeleted={ this.deleteItem }
          onToggleImportant = { this.onToggleImportant }
          onToggleDone = { this.onToggleDone }/>
        <ItemAddForm
          onAdded={ this.addItem }/>
      </div>
    );
  }
};
