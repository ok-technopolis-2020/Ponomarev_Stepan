import {taskListKey} from './keyList'

class TaskStore {
  constructor() {
    this._tasks = [];
    this._init();
  }

  addTask(task) {
    this._tasks.push(task);
  }

  _init() {
    const taskListJson = localStorage.getItem(taskListKey);
    const taskList = JSON.parse(taskListJson);
    this._tasks = taskList !== null ? taskList : this._tasks;
  }

  _saveTasks() {
    const taskListJson = JSON.stringify(this._tasks);
    localStorage.setItem(taskListKey, taskListJson);
  }
}

const taskStore = new TaskStore();
export default taskStore;