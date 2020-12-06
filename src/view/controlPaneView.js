import { AbstractView } from "./AbstractView";

export class ControlPaneView extends AbstractView {
  #leftItemsInfo;
  #filterRadioButtons;
  #clearCompletedButton;
  
  #filterChangedEvent;
  #clearCompletedEvent;

  #observer;
  #observable;
  #controller;

  constructor(controller, observer, observable) {
    super();
    this.#observer = observer;
    this.#observable = observable;
    this.#controller = controller;

    this.#leftItemsInfo = document.querySelector('.control-pane__left-intems-info');
    this.#filterRadioButtons = document.querySelectorAll('.control-pane__task-filter');
    this.#clearCompletedButton = document.querySelector('.control-pane__clear-tasks-button');

    this.#observer.signal = () => {
      this.#updateLeftItemsInfo(this.#controller.leftAmount);
    }

    this.#initEvents();
  }

  destroy() {
    this.filterRadioButtons.forEach(filter => filter.removeEventListener('change', this.#filterChangedEvent));
    this.#clearCompletedButton.removeEventListener('click', this.#clearCompletedEvent);
  }

  get filterRadioButtons() {
    return Array.from(this.#filterRadioButtons);
  }

  #updateLeftItemsInfo(count) {
    this.#leftItemsInfo.textContent = `${count} items left`
  }

  #initEvents() {
    this.#filterChangedEvent = () => {
      const filter = this.filterRadioButtons.find(f => f.checked).value;

      this.#controller.filter = filter;
      this.#observable.changed();
    }

    this.#clearCompletedEvent = () => {
      this.#controller.deleteCompletedTasks();
    }

    this.filterRadioButtons.forEach(filter => filter.addEventListener('change', this.#filterChangedEvent));
    this.#clearCompletedButton.addEventListener('click', this.#clearCompletedEvent);
  }
}
