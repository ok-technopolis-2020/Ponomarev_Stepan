import { Observable } from '../observer/Observable';
import {taskListKey} from './keyList'

export class TaskStore extends Observable {
  #tasks;

  constructor(observers) {
    super(observers);

    this.#tasks = [];
    this.#init();
  }

  #init() {
    const taskListJson = localStorage.getItem(taskListKey);
    const taskListObj = JSON.parse(taskListJson);

    this.#tasks = taskListObj == null ? [] : taskListObj;

    this.changed();
  }

  saveTask(task) {
    const index = this.#tasks.findIndex(t => t.id == task.id);
    
    if (index !== -1) {
      this.#tasks[index] = task;
    } else {
      this.#tasks.push(task);
    }

    this.#saveTasks();

    this.changed();
  }

  removeTask(id) {
    this.#tasks = this.#tasks.filter(t => t.id !== id);
    this.#saveTasks();

    this.changed();
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

  changed() {
    for (observer in this.observerList) {
      observer.signal();
    }
  }
}