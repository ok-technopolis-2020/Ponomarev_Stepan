import { taskStore } from "../store/TaskStore"

class Controller {
    #store;
    #view;

    constructor({ store, view }) {
        this.#store = store;
        this.#view = view;
    }

    addTask(text) {
        //TODO: Сдеалть выброс ошибки
        if (!isTextValid(text)) {
            return;
        }

        const task = this.#createTask(text);

        this.#store.saveTask(task);
    }

    deleteTask(id) {
        this.#store.removeTask(id);
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

export const controller = new Controller({ store: taskStore });