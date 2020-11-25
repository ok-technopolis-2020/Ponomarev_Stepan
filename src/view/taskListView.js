class TaskListView {
  #taskList;
  #completeTaskAction;
  #changeTextAction;
  #removeTaskActiom;

  constructor() {
    this.#taskList = document.querySelector(".todo-list");
    this.#completeTaskAction = null;
    this.#changeTextAction = null;
    this.#removeTaskActiom = null;
  }

  init(completeTaskAction, changeTextAction, removeTaskAction) {
    this.#completeTaskAction = completeTaskAction;
    this.#changeTextAction = changeTextAction;
    this.#removeTaskActiom = removeTaskAction;
  }

  renderTasks(tasks) {
    this.#taskList.innerHTML = '';
    const template = document.createDocumentFragment();

    tasks.forEach(task => {
      const item = this.#taskItem(task);

      this.#addEvents(item, task);

      template.appendChild(item);
    });

    const listIsEmpty = tasks.length == 0;
    this.#setEmptyClass(listIsEmpty);

    this.#taskList.appendChild(template);
  }

  removeTask(id) {
    const tasks = Array.from(this.#taskList.childNodes);
    const taskItem = tasks.find(t => t.dataset.id === id);

    if (!taskItem) {
      return;
    }

    this.#taskList.removeChild(taskItem);
    
    const listIsEmpty = tasks.length - 1 == 0;
    this.#setEmptyClass(listIsEmpty);
  }

  #setEmptyClass(emptyClassIsActive) {
    this.#taskList.classList.toggle("todo-list_empty", emptyClassIsActive);
  }

  #taskItem(task) {
    const li = document.createElement('li');
    const checkBox = this.#checkBox(task);
    const inputField = this.#inputField(task);
    const spanField = this.#spanField(task);
    const removeButton = this.#removeTaskButton();

    li.dataset.id = task.id;
    li.classList.add('todo-list__item');
    li.append(checkBox, inputField, spanField, removeButton);

    return li;
  }

  #checkBox(task) {
    const checkBox = document.createElement('input');

    checkBox.type = 'checkbox';
    checkBox.checked = task.completed;
    checkBox.classList.add('todo-list__complete-button');
    checkBox.setAttribute('aria-label', 'complete task');

    return checkBox;
  }

  #inputField(task) {
    const inputField = document.createElement('input');
    
    inputField.type = 'text';
    inputField.classList.add('todo-list__text', 'todo-list__text_thin_font', 'changed-font');
    inputField.value = task.text;

    return inputField;
  }

  #spanField(task) {
    const spanField = document.createElement('span');
    
    spanField.classList.add('todo-list__text', 'todo-list__text_thin_font', 'changed-font');
    spanField.textContent = task.text;

    return spanField;
  }

  #removeTaskButton() {
    const button = document.createElement('button');

    button.classList.add('todo-list__remove-task-button');
    button.setAttribute('aria-label', 'remove item');

    return button;
  }

  #addEvents(item, task) {
    const removeButton  = item.querySelector('.todo-list__remove-task-button');
    const checkBox = item.querySelector('.todo-list__complete-button');
    const inputField = item.querySelector('input.todo-list__text_thin_font');

    const checkBoxOnClick = ({target}) => this.#completeTaskAction(task,  target.checked);

    let valueBefore = task.text;
    const inputFieldFocusin =  ({target}) => {
      valueBefore = target.value;
    };
    const inputFieldFocusout =  ({target}) => {
      if (target.value !== valueBefore) {
        this.#changeTextAction(task, target.value);
      }
    }

    const removeButtonOnClick = () => {
      this.#removeTaskActiom(task.id);
      
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

export const taskListView = new TaskListView();