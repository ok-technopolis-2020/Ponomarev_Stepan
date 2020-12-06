import { isTextValid, getId } from '../helpers'

export class Controller {
    #store;
    #filterStatus;

    constructor(store, filter) {
        this.#store = store;
        this.#filterStatus = filter;
    }

    saveTask(text) {
        if (!isTextValid(text)) {
            return;
        }

        const task = this.#createTask(text);

        this.#store.saveTask(task);
    }

    putTask(task) {
        if (!isTextValid(task.text)) {
            return;
        }

        this.#store.saveTask(task);
    }

    deleteTask(id) {
        this.#store.removeTask(id);
    }

    deleteCompletedTasks() {
        const tasks = this.#store.taskList.filter(task => !task.completed);

        this.#store.setTasks(tasks);
    }

    get tasks() {
        let tasks = [];

        switch (this.#filterStatus) {
            case 'All':
                tasks = this.#store.taskList;
                break;
            case 'Active':
                tasks = this.#store.taskList.filter(task => !task.completed);
                break;
            case 'Completed':
                tasks = this.#store.taskList.filter(task => task.completed);
                break;
        }

        return tasks;
    }

    changeTasksCompletedStatus() {
        const status = !this.#store.areAllTasksCompleted;

        const tasks = [];

        this.#store.taskList.forEach(task => {
            task.completed = status;
            tasks.push(task);
        });

        this.#store.setTasks(tasks);

        this.#store.areAllTasksCompleted = status;
    }

    get leftAmount() {
        return this.#store.taskList.filter(task => !task.completed).length;
    }

    set filter(filter) {
        this.#filterStatus = filter
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