class AddTaskFormView {
  constructor() {
    this._form = document.forms["addTaskForm"];
    this._inputField = this._form["addTaskInputField"];
  }

  get form() {
    return this._form;
  }

  get inputField() {
    return this._inputField;
  }
}

const addTaskFormView = new AddTaskFormView();

export default addTaskFormView;