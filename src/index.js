"use strict"

import { AddTaskFormView } from "./view/AddTaskFormView";
import { ControlPaneView } from "./view/ControlPaneView";
import { TaskListView } from "./view/TaskListView";
import { TaskStore } from "./store/TaskStore";
import {Controller} from './controller/Controller';
import { TaskRenderObserver } from './observer/TaskRenderObserver';
import {LeftInfoObserver} from './observer/LeftInfoObserver';
import { TaskRenderObservable } from './observer/TaskRenderObservable';

const dafaultFilter = "All";

const observer = new TaskRenderObserver();
const leftInfoObserver = new LeftInfoObserver();
const observable = new TaskRenderObservable([observer, leftInfoObserver]);

const taskStore = new TaskStore(observable);
const controller = new Controller(taskStore, dafaultFilter);

const addTaskFormView = new AddTaskFormView(controller);
const taskListView = new TaskListView(controller, observer);
const controlPaneView = new ControlPaneView(controller, leftInfoObserver, observable);

observable.changed();


