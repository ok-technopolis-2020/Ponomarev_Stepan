"use strict"

import {getId} from './helpers'
import addTaskFormView from "./view/addTaskFormView"
import taskListView from "./view/taskListView"
import taskStore from "./store"

const form = addTaskFormView.form;
const addTaskInputField = addTaskFormView.inputField;

taskListView.init(() => {}, onDeleteTask);

form.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
  const value = addTaskInputField.value;

  form.reset();
  e.preventDefault();

  taskListView.renderTasks([]);
}

function onDeleteTask(task) {
  console.log(task);
}

function onConpleteTask(task, completeStatus) {
  task.completed = completeStatus;
}

function createTask(text) {
  const task = {
    id: getId(),
    text: text,
    completed: false
  }

  
}