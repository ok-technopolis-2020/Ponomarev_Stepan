import { controller } from "./controller/Controller.js"

function onFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const inputField = form["addTaskInputField"];
    const text = inputField.value;

    addTaskFormView.reset();

    if (!isTextValid(text)) {
        return;
    }

    const task = createTask(text);

    taskStore.saveTask(task);
}