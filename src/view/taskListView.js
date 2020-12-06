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

  destroy() {
    this.#destroyItems();
  }

  renderTasks(tasks) {
    this.destroy();

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

    this.#taskItems.splice(index, 1);
    
    const listIsEmpty = this.#taskItems.length == 0;
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
    return new TodoItemView(task, this.#controller);
  }

  #destroyItems() {
    this.#taskItems.forEach(task => task.destroy());
    this.#taskItems = [];
  }
}