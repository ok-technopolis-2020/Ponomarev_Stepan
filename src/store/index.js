import {taskListKey} from './keyList'

class TaskStore {
  constructor() {
    this._tasks = {};
    this._unicueId = 0;
    this._init();
  }

  saveTask(task) {
    this._tasks[task.id] = task;
  }

  _init() {
    const taskListJson = localStorage.getItem(taskListKey);
    this._tasks = JSON.parse(taskListJson);
  }

  _saveTasks() {
    const taskListJson = JSON.stringify(this._tasks);
    localStorage.setItem(taskListKey, taskListJson);
  }
}

const taskStore = new TaskStore();
export default taskStore;