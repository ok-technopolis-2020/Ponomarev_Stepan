"use strict"

import {getId, isTextValid} from './helpers'
import addTaskFormView from "./view/addTaskFormView"
import taskListView from "./view/taskListView"
import taskStore from "./store"

const form = addTaskFormView.form;
const completeAllButton = addTaskFormView.completeAllButton;
const addTaskInputField = addTaskFormView.inputField;

taskStore.init();
taskListView.init(onCompleteTask, onTaskTextChanged, onDeleteTask);
taskListView.renderTasks(taskStore.taskList);

form.addEventListener('submit', onFormSubmit);
completeAllButton.addEventListener('click', onClickCompleteAll)

function onClickCompleteAll(e) {
  e.preventDefault();

  setTasksCompletedStatus(!taskStore.areAllTasksCompleted);
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
}

function onDeleteTask(id) {
  taskStore.removeTask(id);
  taskListView.renderTasks(taskStore.taskList);
}

function onCompleteTask(task, completeStatus) {
  task.completed = completeStatus;
  taskStore.saveTask(task);
}

function onTaskTextChanged(task, text) {
  if (isTextValid(text)) {
    task.text = text;
    taskStore.saveTask(task);
  }

  taskListView.renderTasks(taskStore.taskList);
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
  taskListView.renderTasks(taskStore.taskList);
}