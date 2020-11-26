import { AbstractView } from "./AbstractView";

class ControlPaneView extends AbstractView {
  #leftItemsInfo;
  #filterRadioButtons;
  #clearCompletedButton;
  #filterChangedEvent;
  #clearCompletedEvent;

  constructor() {
    super();
    this.#leftItemsInfo = document.querySelector('.control-pane__left-intems-info');
    this.#filterRadioButtons = document.querySelectorAll('.control-pane__task-filter');
    this.#clearCompletedButton = document.querySelector('.control-pane__clear-tasks-button');
  }

  init(filterChangedEvent, clearCompletedEvent) {
    this.#filterChangedEvent = filterChangedEvent;
    this.#clearCompletedEvent = clearCompletedEvent;

    this.#initEvents();
  }

  destroy() {
    this.filterRadioButtons.forEach(filter => filter.removeEventListener('change', this.#filterChangedEvent));
    this.#clearCompletedButton.removeEventListener('click', this.#clearCompletedEvent);
  }

  updateLeftItemsInfo(count) {
    this.#leftItemsInfo.textContent = `${count} items left`
  }

  get filterRadioButtons() {
    return Array.from(this.#filterRadioButtons);
  }

  #initEvents() {
    this.filterRadioButtons.forEach(filter => filter.addEventListener('change', this.#filterChangedEvent));
    this.#clearCompletedButton.addEventListener('click', this.#clearCompletedEvent);
  }
}

export const controlPaneView = new ControlPaneView();