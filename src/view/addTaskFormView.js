import { AbstractView } from "./AbstractView";

class AddTaskFormView extends AbstractView {
  #form;
  #completeAllButton
  #inputField;
  #completeAllTasksEvent;
  #formSubmitEvent;

  constructor() {
    super();
    this.#form = document.forms["addTaskForm"];
    this.#completeAllButton = this.#form["completeAllButton"];
    this.#inputField = this.#form["addTaskInputField"];
  }

  init(formSubmitEvent, completeAllTasksEvent) {
      this.#formSubmitEvent = formSubmitEvent;
      this.#completeAllTasksEvent = completeAllTasksEvent;
      this.#initEvents();
  }

  destroy() {
    this.#form.removeEventListener('submit', this.#formSubmitEvent);
    this.#completeAllButton.removeEventListener('click', this.#completeAllTasksEvent);
  }

  reset() {
    this.#form.reset();
  }

  get value() {
    return this.#inputField.value;
  }

  #initEvents() {
    this.#form.addEventListener('submit', this.#formSubmitEvent);
    this.#completeAllButton.addEventListener('click', this.#completeAllTasksEvent);
  }
}

export const addTaskFormView = new AddTaskFormView();
