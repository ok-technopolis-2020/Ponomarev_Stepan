import { AbstractView } from "./AbstractView";

export class ControlPaneView extends AbstractView {
  #leftItemsInfo;
  #filterRadioButtons;
  #clearCompletedButton;
  #filterChangedEvent;
  #clearCompletedEvent;

  constructor({renderTasks, onClickClearCompletedTasks}) {
    super();
    this.#leftItemsInfo = document.querySelector('.control-pane__left-intems-info');
    this.#filterRadioButtons = document.querySelectorAll('.control-pane__task-filter');
    this.#clearCompletedButton = document.querySelector('.control-pane__clear-tasks-button');

    this.#filterChangedEvent = renderTasks;
    this.#clearCompletedEvent = onClickClearCompletedTasks;

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
