import {isTextValid, getId} from '../helpers'

export class Controller {
    #store;

    constructor(store) {
        this.#store = store;
    }

    addTask(text) {
        if (!isTextValid(text)) {
            return;
        }

        const task = this.#createTask(text);

        this.#store.saveTask(task);
    }

    deleteTask(id) {
        this.#store.removeTask(id);
    }

    get tasks() {
        return this.#store.taskList;
    }

    changeTasksCompletedStatus() {
        const status = !this.#store.areAllTasksCompleted;

        const tasks = [];

        this.#store.taskList.forEach(task => {
          task.completed = status;
          tasks.push(task);
        });

        this.#store.saveTasks(tasks);
      
        this.#store.areAllTasksCompleted = status;
      }

    #createTask(text) {
        const task = {
            id: getId(),
            text: text,
            completed: false
        }

        return task;
    }
}