class ControlPaneView {
  constructor() {
    this._leftItemsInfo = document.querySelector('.control-pane__left-intems-info');
    this._filterRadioButtons = document.querySelectorAll('.control-pane__task-filter');
    this._clearCompletedButton = document.querySelector('.control-pane__clear-tasks-button');
  }

  get leftItemsInfo() {
    return this._leftItemsInfo;
  }

  get filterRadioButtons() {
    return this._filterRadioButtons;
  }

  get clearCompletedButton() {
    return this._clearCompletedButton;
  }

  updateLeftItemsInfo(count) {
    this._leftItemsInfo.textContent = `${count} items left`
  }
}

const controlPaneView = new ControlPaneView();

export default controlPaneView;