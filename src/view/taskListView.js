import { AbstractView } from "./AbstractView";
import { TodoItemView } from "./TodoItemView";

export class TaskListView extends AbstractView {
  #taskListElement;
  #taskItems;
  #observer;
  #controller;

  constructor(controller, observer) {
    super();
    this.#controller = controller;
    this.#observer = observer;
    this.#taskListElement = document.querySelector(".todo-list");
    this.#taskItems = [];

    this.#observer.signal = () => {
      this.renderTasks(this.#controller.tasks);
    }
  }

  renderTasks(tasks) {
    this.destroy();

    tasks.forEach(task => {
      this.#taskItems.push(this.#createTaskItem(task));
    });

    this.#renderTasks();
  }

  destroy() {
    this.#destroyItems();
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
    return new TodoItemView(task, this.#controller);
  }

  #destroyItems() {
    this.#taskItems.forEach(task => task.destroy());
    this.#taskItems = [];
  }
}