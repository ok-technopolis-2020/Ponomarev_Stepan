import { AbstractView } from "./AbstractView";
import { TodoItemView } from "./toloItemView";

class TaskListView extends AbstractView {
  #taskListElement;
  #taskItems;

  #completeTaskEvent;
  #changeTextEvent;
  #removeTaskEvent;

  constructor() {
    super();
    this.#taskListElement = document.querySelector(".todo-list");
    this.#taskItems = [];
  }

  init(completeTaskEvent, changeTextEvent, removeTaskEvent) {
    this.#completeTaskEvent = completeTaskEvent;
    this.#changeTextEvent = changeTextEvent;
    this.#removeTaskEvent = removeTaskEvent;
  }

  destroy() {
    this.#destroyItems();
  }

  renderTasks(tasks) {
    this.#destroyItems();

    tasks.forEach(task => {
      this.#taskItems.push(this.#createTaskItem(task));
    });

    this.#renderTasks();
  }

  removeTask(id) {
    const index = this.#taskItems.findIndex(t => t.taskId == id);

    if (index == -1) {
      return;
    }

    const item = this.#taskItems[index];
    this.#taskListElement.removeChild(item.taskItemElement);
    item.destroy()

    this.#taskItems = this.#taskItems.splice(index, 1);

    const listIsEmpty = this.#taskItems.length - 1 == 0;
    this.#setEmptyClass(listIsEmpty);
  }

  #renderTasks() {
    this.#taskListElement.innerHTML = '';

    const template = document.createDocumentFragment();

    this.#taskItems.forEach(taskItem => template.appendChild(taskItem.taskItemElement));

    this.#taskListElement.appendChild(template);

    this.#setEmptyClass(this.#taskItems.length == 0);
  }

  #setEmptyClass(emptyClassIsActive) {
    this.#taskListElement.classList.toggle("todo-list_empty", emptyClassIsActive);
  }

  #createTaskItem(task) {
    let valueBefore = task.text;

    const completeTaskEvent = ({ target }) => this.#completeTaskEvent(task, target.checked);

    const inputFieldFocusin = ({ target }) => {
      valueBefore = target.value;
    };

    const inputFieldFocusout = ({ target }) => {
      if (target.value !== valueBefore) {
        this.#changeTextEvent(task, target.value);
      }
    }

    const removeButtonOnClick = () => {
      this.#removeTaskEvent(task.id);
    };

    return new TodoItemView(task, completeTaskEvent, inputFieldFocusin, inputFieldFocusout, removeButtonOnClick);
  }

  #destroyItems() {
    this.#taskItems.forEach(task => task.destroy());
    this.#taskItems = [];
  }
}

export const taskListView = new TaskListView();