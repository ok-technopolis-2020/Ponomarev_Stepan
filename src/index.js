"use strict"

import { getId, isTextValid } from './helpers'
import { AddTaskFormView } from "./view/AddTaskFormView"
import { ControlPaneView } from "./view/controlPaneView"
import { TaskListView } from "./view/taskListView"
import { TaskStore } from "./store/TaskStore"
import {Controller} from './controller/Controller';
import { TaskStoreObserver } from './observer/TaskStoreObserver'

const observer = new TaskStoreObserver();
const taskStore = new TaskStore([observer]);
const controller = new Controller(taskStore);

const addTaskFormView = new AddTaskFormView(controller);
const taskListView = new TaskListView(controller, observer);
const controlPaneView = new ControlPaneView({renderTasks, onClickClearCompletedTasks}, controller);

renderTasks();

// Events
function onClickClearCompletedTasks() {
  const tasksToRemove = taskStore.taskList.filter(task => task.completed);

  tasksToRemove.forEach(task => taskStore.removeTask(task.id));

  renderTasks();
}

// Helpers
function renderTasks() {
  const filterMode = controlPaneView.filterRadioButtons.find(f => f.checked).value;

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