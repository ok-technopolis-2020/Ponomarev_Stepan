import {taskListKey} from './keyList'

class TaskStore {
  constructor() {
    this._tasks = {};
    this._allTaskAreCompleted = false;
  }

  init() {
    const taskListJson = localStorage.getItem(taskListKey);
    const taskListObj = JSON.parse(taskListJson);

    this._tasks = taskListObj == null ? {} : taskListObj;
  }

  saveTask(task) {
    if (!task.completed) {
      this._allTaskAreCompleted = false;
    }

    this._tasks[task.id] = task;
    this._saveTasks();
  }

  removeTask(id) {
    delete this._tasks[id];
    this._saveTasks();
  }

  get taskList() {
    return Object.values(this._tasks);
  }

  get areAllTasksCompleted() {
    return this._allTaskAreCompleted;
  }

  set areAllTasksCompleted(value) {
    this._allTaskAreCompleted = value;
  }

  _saveTasks() {
    const taskListJson = JSON.stringify(this._tasks);
    localStorage.setItem(taskListKey, taskListJson);
  }
}

const taskStore = new TaskStore();
export default taskStore;