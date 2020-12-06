import { AbstractView } from "./AbstractView";

export class AddTaskFormView extends AbstractView {
  #form;
  #completeAllButton
  #inputField;
  #completeAllTasksEvent;
  #addTaskEvent 
  #controller;

  constructor(controller) {
    super();
    this.#form = document.forms["addTaskForm"];
    this.#completeAllButton = this.#form["completeAllButton"];
    this.#inputField = this.#form["addTaskInputField"];

    this.#controller = controller;
    this.#initEvents();
  }

  destroy() {
    this.#form.removeEventListener('submit', this.#addTaskEvent);
    this.#completeAllButton.removeEventListener('click', this.#completeAllTasksEvent);
  }

  reset() {
    this.#form.reset();
  }

  get value() {
    return this.#inputField.value;
  }

  #initEvents() {
    this.#completeAllTasksEvent = (e) => {
      e.preventDefault();

      this.#controller.changeTasksCompletedStatus();
    }

    this.#addTaskEvent = (e) => {
      e.preventDefault();

      const form = e.target;
      const inputField = form["addTaskInputField"];
      const text = inputField.value;

      this.#controller.addTask(text);

      form.reset();
    }
    
    this.#form.addEventListener('submit', this.#addTaskEvent);
    this.#completeAllButton.addEventListener('click', this.#completeAllTasksEvent);
  }
}