class AddTaskFormView {
  #form;
  #completeAllButton;
  #inputField;

  constructor() {
    this.#form = document.forms["addTaskForm"];
    this.#completeAllButton = this.#form["completeAllButton"];
    this.#inputField = this.#form["addTaskInputField"];
  }

  get form() {
    return this.#form;
  }

  get completeAllButton() {
    return this.#completeAllButton;
  }

  get inputField() {
    return this.#inputField;
  }
}

export const addTaskFormView = new AddTaskFormView();
