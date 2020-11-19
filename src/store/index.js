import {taskListKey} from './keyList'

class TaskStore {
  constructor() {
    this._tasks = [];
  }

  init() {
    const taskListJson = localStorage.getItem(taskListKey);
    const taskListObj = JSON.parse(taskListJson);

    this._tasks = taskListObj == null ? [] : taskListObj;
  }

  saveTask(task) {
    const id = this._tasks.findIndex(t => t.id == task.id);
    
    if (id !== -1) {
      this._tasks[id] = task;
    } else {
      this._tasks.push(task);
    }

    this._saveTasks();
  }

  removeTask(id) {
    this._tasks = this._tasks.filter(t => t.id !== id);
    this._saveTasks();
  }

  get taskList() {
    return this._tasks;
  }

  get areAllTasksCompleted() {
    return this.taskList.reduce((acc, task) => acc && task.completed, true);
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