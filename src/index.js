"use strict"

import { getId, isTextValid } from './helpers'
import { addTaskFormView } from "./view/addTaskFormView"
import { controlPaneView } from "./view/controlPaneView"
import { taskListView } from "./view/taskListView"
import { taskStore } from "./store"

const form = addTaskFormView.form;
const completeAllButton = addTaskFormView.completeAllButton;
const addTaskInputField = addTaskFormView.inputField;

const filterRadioButtons = controlPaneView.filterRadioButtons;
const clearCompletedButton = controlPaneView.clearCompletedButton;

form.addEventListener('submit', onFormSubmit);
completeAllButton.addEventListener('click', onClickCompleteAll);

filterRadioButtons.forEach(filter => filter.addEventListener('change', renderTasks));
clearCompletedButton.addEventListener('click', onClickClearCompletedTasks);

init();

function init() {
  taskStore.init();
  taskListView.init(onCompleteTask, onTaskTextChanged, onDeleteTask);
  renderTasks();
}

// Events
function onClickCompleteAll(e) {
  e.preventDefault();

  setTasksCompletedStatus(!taskStore.areAllTasksCompleted);
  renderTasks();
}

function onFormSubmit(e) {
  const text = addTaskInputField.value;

  e.preventDefault();
  form.reset();

  if (!isTextValid(text)) {
    return;
  }

  const task = createTask(text);

  taskStore.saveTask(task);

  renderTasks();
}

function onDeleteTask(id) {
  taskStore.removeTask(id);
  taskListView.removeTask(id)
}

function onCompleteTask(task, completeStatus) {
  task.completed = completeStatus;
  taskStore.saveTask(task);

  renderTasks();
}

function onTaskTextChanged(task, text) {
  if (isTextValid(text)) {
    task.text = text;
    taskStore.saveTask(task);
  }

  renderTasks();
}

function onClickClearCompletedTasks() {
  const tasksToRemove = taskStore.taskList.filter(task => task.completed);

  tasksToRemove.forEach(task => taskStore.removeTask(task.id));

  renderTasks();
}

// Helpers
function renderTasks() {
  const filterMode = filterRadioButtons.find(f => f.checked).value;

  let tasks = [];
  switch (filterMode) {
    case 'All':
      tasks = taskStore.taskList;
      break;
    case 'Active':
      tasks = taskStore.taskList.filter(task => !task.completed);
      break;
    case 'Completed':
      tasks = taskStore.taskList.filter(task => task.completed);
      break;
  }

  updateLeftInfo();
  taskListView.renderTasks(tasks);
}

function createTask(text) {
  const task = {
    id: getId(),
    text: text,
    completed: false
  }

  return task;
}

function setTasksCompletedStatus(status) {
  taskStore.taskList.forEach(task => {
    task.completed = status;
    taskStore.saveTask(task);
  });

  taskStore.areAllTasksCompleted = status;
}

function updateLeftInfo() {
  const n = taskStore.taskList.filter(task => !task.completed).length;

  controlPaneView.updateLeftItemsInfo(n);
}