"use strict"

import {getId} from './helpers'
import addTaskFormView from "./view/addTaskFormView"
import taskListView from "./view/taskListView"
import taskStore from "./store"

const form = addTaskFormView.form;
const addTaskInputField = addTaskFormView.inputField;

taskStore.init();
taskListView.init(onCompleteTask, onTaskTextChanged, onDeleteTask);
taskListView.renderTasks(taskStore.taskList);

form.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
  const text = addTaskInputField.value;
  const task = createTask(text);

  taskStore.saveTask(task);

  form.reset();
  e.preventDefault();

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
  task.text = text;

  taskStore.saveTask(task);
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