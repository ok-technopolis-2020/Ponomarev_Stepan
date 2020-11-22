import {taskListKey} from './keyList'

class TaskStore {
  #tasks;

  constructor() {
    this.#tasks = [];
  }

  init() {
    const taskListJson = localStorage.getItem(taskListKey);
    const taskListObj = JSON.parse(taskListJson);

    this.#tasks = taskListObj == null ? [] : taskListObj;
  }

  saveTask(task) {
    const index = this.#tasks.findIndex(t => t.id == task.id);
    
    if (index !== -1) {
      this.#tasks[index] = task;
    } else {
      this.#tasks.push(task);
    }

    this.#saveTasks();
  }

  removeTask(id) {
    this.#tasks = this.#tasks.filter(t => t.id !== id);
    this.#saveTasks();
  }

  get taskList() {
    return this.#tasks;
  }

  get areAllTasksCompleted() {
    return this.taskList.reduce((acc, task) => acc && task.completed, true);
  }

  set areAllTasksCompleted(value) {
    this._allTaskAreCompleted = value;
  }

  #saveTasks() {
    const taskListJson = JSON.stringify(this.#tasks);
    localStorage.setItem(taskListKey, taskListJson);
  }
}

const taskStore = new TaskStore();

export default taskStore;