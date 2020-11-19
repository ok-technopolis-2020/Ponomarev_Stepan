class TaskListView {
  constructor() {
    this._taskList = document.querySelector(".todo-list");
    this._completeTaskAction = null;
    this._changeTextAction = null;
    this._removeTaskActiom = null;
  }

  init(completeTaskAction, changeTextAction, removeTaskAction) {
    this._completeTaskAction = completeTaskAction;
    this._changeTextAction = changeTextAction;
    this._removeTaskActiom = removeTaskAction;
  }

  renderTasks(tasks) {
    this._taskList.innerHTML = '';
    const template = document.createDocumentFragment();

    tasks.forEach(task => {
      const item = this._taskItem(task);

      this._addEvents(item, task);

      template.appendChild(item);
    });

    this._setEmptyClass(tasks.length == 0);

    this._taskList.appendChild(template);
  }

  removeTask(id) {
    const tasks = Array.from(this._taskList.childNodes);
    const taskItem = tasks.find(t => t.dataset.id === id);

    if (!taskItem) {
      return;
    }

    this._taskList.removeChild(taskItem);

    this._setEmptyClass(tasks.length - 1 == 0);
  }

  _setEmptyClass(emptyClassIsActive) {
    this._taskList.classList.toggle("todo-list_empty", emptyClassIsActive);
  }

  _taskItem(task) {
    const li = document.createElement('li');
    const checkBox = this._checkBox(task);
    const inputField = this._inputField(task);
    const spanField = this._spanField(task);
    const removeButton = this._removeTaskButton();
    li.dataset.id = task.id;

    li.classList.add('todo-list__item');
    
    li.append(checkBox, inputField, spanField, removeButton);

    return li;
  }

  _checkBox(task) {
    const checkBox = document.createElement('input');

    checkBox.type = 'checkbox';
    checkBox.checked = task.completed;
    checkBox.classList.add('todo-list__complete-button');
    checkBox.setAttribute('aria-label', 'complete task');

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

  _removeTaskButton() {
    const button = document.createElement('button');

    button.classList.add('todo-list__remove-task-button');
    button.setAttribute('aria-label', 'remove item');

    return button;
  }

  _addEvents(item, task) {
    const removeButton  = item.querySelector('.todo-list__remove-task-button');
    const checkBox = item.querySelector('.todo-list__complete-button');
    const inputField = item.querySelector('input.todo-list__text_thin_font');

    let valueBefore = task.text;
    
    const checkBoxOnClick = ({target}) => this._completeTaskAction(task,  target.checked);
    const inputFieldFocusin =  ({target}) => {
      valueBefore = target.value;
    };
    const inputFieldFocusout =  ({target}) => {
      if (target.value !== valueBefore) {
        this._changeTextAction(task, target.value);
      }
    }
    const removeButtonOnClick = () => {
      this._removeTaskActiom(task.id);
      removeButton.removeEventListener('click', removeButtonOnClick);
      checkBox.removeEventListener('click', checkBoxOnClick);
      inputField.removeEventListener('focusin', inputFieldFocusin);
      inputField.removeEventListener('focusout', inputFieldFocusout);
    };

    checkBox.addEventListener('click', checkBoxOnClick);
    inputField.addEventListener('focusin', inputFieldFocusin);
    inputField.addEventListener('focusout', inputFieldFocusout);
    removeButton.addEventListener('click', removeButtonOnClick);
  }
}

const taskListView = new TaskListView();

export default taskListView;