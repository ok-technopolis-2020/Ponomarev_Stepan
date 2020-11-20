class ControlPaneView {
  #leftItemsInfo;
  #filterRadioButtons;
  #clearCompletedButton;

  constructor() {
    this.#leftItemsInfo = document.querySelector('.control-pane__left-intems-info');
    this.#filterRadioButtons = document.querySelectorAll('.control-pane__task-filter');
    this.#clearCompletedButton = document.querySelector('.control-pane__clear-tasks-button');
  }

  get leftItemsInfo() {
    return this.#leftItemsInfo;
  }

  get filterRadioButtons() {
    return Array.from(this.#filterRadioButtons);
  }

  get clearCompletedButton() {
    return this.#clearCompletedButton;
  }

  updateLeftItemsInfo(count) {
    this.#leftItemsInfo.textContent = `${count} items left`
  }
}

const controlPaneView = new ControlPaneView();

export default controlPaneView;