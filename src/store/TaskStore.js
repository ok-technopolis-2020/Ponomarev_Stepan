import { Observable } from '../observer/Observable';
import {taskListKey} from './keyList'

export class TaskStore {
  #tasks;
  #observable

  constructor(observable) {
    this.#observable = observable
    this.#tasks = [];
    this.#init();
  }

  saveTask(task) {
    const index = this.#tasks.findIndex(t => t.id == task.id);
    
    if (index !== -1) {
      this.#tasks[index] = task;
    } else {
      this.#tasks.push(task);
    }

    this.#saveTasks();
    this.#observable.changed();
  }

  setTasks(tasks) {
    this.#tasks = tasks;
    this.#saveTasks();

    this.#observable.changed();
  }

  removeTask(id) {
    this.#tasks = this.#tasks.filter(t => t.id !== id);
    this.#saveTasks();

    this.#observable.changed();
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

  #init() {
    const taskListJson = localStorage.getItem(taskListKey);
    const taskListObj = JSON.parse(taskListJson);

    this.#tasks = taskListObj == null ? [] : taskListObj;

    this.#observable.changed();
  }

  #saveTasks() {
    const taskListJson = JSON.stringify(this.#tasks);
    localStorage.setItem(taskListKey, taskListJson);
  }
}