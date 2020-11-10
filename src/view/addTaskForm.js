class AddTaskForm {
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

const addTaskForm = new AddTaskForm();

export default addTaskForm;