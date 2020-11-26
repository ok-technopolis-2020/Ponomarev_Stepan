import { AbstractView } from "./AbstractView";

export class AddTaskFormView extends AbstractView {
  #form;
  #completeAllButton
  #inputField;
  #completeAllTasksEvent;
  #submitFormEvent;

  constructor(formSubmitEvent, completeAllTasksEvent) {
    super();
    this.#form = document.forms["addTaskForm"];
    this.#completeAllButton = this.#form["completeAllButton"];
    this.#inputField = this.#form["addTaskInputField"];

    this.#submitFormEvent = formSubmitEvent;
    this.#completeAllTasksEvent = completeAllTasksEvent;
    this.#initEvents();
  }

  destroy() {
    this.#form.removeEventListener('submit', this.#submitFormEvent);
    this.#completeAllButton.removeEventListener('click', this.#completeAllTasksEvent);
  }

  reset() {
    this.#form.reset();
  }

  get value() {
    return this.#inputField.value;
  }

  #initEvents() {
    this.#form.addEventListener('submit', this.#submitFormEvent);
    this.#completeAllButton.addEventListener('click', this.#completeAllTasksEvent);
  }
}