class AddTaskFormView {
  constructor() {
    this._form = document.forms["addTaskForm"];
    this._completeAllButton = this._form["completeAllButton"];
    this._inputField = this._form["addTaskInputField"];
  }

  get form() {
    return this._form;
  }

  get completeAllButton() {
    return this._completeAllButton;
  }

  get inputField() {
    return this._inputField;
  }
}

const addTaskFormView = new AddTaskFormView();

export default addTaskFormView;