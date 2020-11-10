"use strict"

import {getId, isTextValid} from './helpers'
import addTaskFormView from "./view/addTaskFormView"
import controlPaneView from "./view/controlPaneView"
import taskListView from "./view/taskListView"
import taskStore from "./store"

const form = addTaskFormView.form;
const completeAllButton = addTaskFormView.completeAllButton;
const addTaskInputField = addTaskFormView.inputField;

const leftItemsInfo = controlPaneView.leftItemsInfo;
const filterRadioButtons = controlPaneView.filterRadioButtons;
const clearCompletedButton = controlPaneView.clearCompletedButton;

form.addEventListener('submit', onFormSubmit);
completeAllButton.addEventListener('click', onClickCompleteAll);

clearCompletedButton.addEventListener('click', onClickClearCompletedTasks)

init();

function init() {
  taskStore.init();
  taskListView.init(onCompleteTask, onTaskTextChanged, onDeleteTask);
  updateLeftInfo();
  taskListView.renderTasks(taskStore.taskList);
}

// Events
function onClickCompleteAll(e) {
  e.preventDefault();

  setTasksCompletedStatus(!taskStore.areAllTasksCompleted);
  updateLeftInfo();
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


  taskListView.renderTasks(taskStore.taskList);
  updateLeftInfo();
}

function onDeleteTask(id) {
  taskStore.removeTask(id);
  taskListView.renderTasks(taskStore.taskList);

  updateLeftInfo();
}

function onCompleteTask(task, completeStatus) {
  task.completed = completeStatus;
  taskStore.saveTask(task);

  updateLeftInfo();
}

function onTaskTextChanged(task, text) {
  if (isTextValid(text)) {
    task.text = text;
    taskStore.saveTask(task);
  }

  taskListView.renderTasks(taskStore.taskList);
}

function onClickClearCompletedTasks() {
  const tasksToRemove = taskStore.taskList.filter(task => task.completed);

  tasksToRemove.forEach(task => taskStore.removeTask(task.id));

  taskListView.renderTasks(taskStore.taskList);
}

// Helpers
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
  taskListView.renderTasks(taskStore.taskList);
}

function updateLeftInfo() {
  const n = taskStore.taskList.filter(task => !task.completed).length;

  controlPaneView.updateLeftItemsInfo(n);
}