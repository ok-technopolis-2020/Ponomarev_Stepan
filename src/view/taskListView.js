class TaskListView {
  constructor() {
    this._taskList = document.querySelector(".todo-list");
    this._completeTaskAction = null;
    this._removeTaskActiom = null;
  }

  init(completeTaskAction, removeTaskAction) {
    this._completeTaskAction = completeTaskAction;
    this._removeTaskActiom = removeTaskAction;
  }

  renderTasks(tasks) {
    this._taskList.innerHTML = '';
    const template = document.createDocumentFragment();

    tasks.forEach(task => {
      template.appendChild(this._taskItem(task));
    });

    this._taskList.appendChild(template);
  }

  _taskItem(task) {
    const li = document.createElement('li')
    const checkBox = this._checkBox(task);
    const inputField = this._inputField(task);
    const spanField = this._spanField(task);
    const removeButton = this._removeTaskButton(task);

    li.classList.add('todo-list__item');
    
    li.append(checkBox, inputField, spanField, removeButton);

    return li;
  }

  _checkBox(task) {
    const checkBox = document.createElement('input');

    checkBox.type = 'checkbox';
    checkBox.classList.add('todo-list__complete-button');
    checkBox.setAttribute('aria-label', 'complete task');

    checkBox.addEventListener('click', ({target}) => this._completeTaskAction(task,  target.checked));

    return checkBox;
  }

  _inputField(task) {
    const inputField = document.createElement('input');
    
    inputField.type = 'text';
    inputField.classList.add('todo-list__text', 'todo-list__text_thin_font', 'changed-font');
    inputField.value = task.text;

    return inputField;
  }

  _spanField(task) {
    const spanField = document.createElement('span');
    
    spanField.classList.add('todo-list__text', 'todo-list__text_thin_font', 'changed-font');
    spanField.textContent = task.text;

    return spanField;
  }

  _removeTaskButton(task) {
    const button = document.createElement('button');

    button.classList.add('todo-list__remove-task-button');
    button.setAttribute('aria-label', 'remove item');

    button.addEventListener('click', () => this._removeTaskActiom(task.id));

    return button;
  }
}

const taskListView = new TaskListView();

export default taskListView;