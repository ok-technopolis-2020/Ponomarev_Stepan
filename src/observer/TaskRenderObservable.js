import { Observable } from "./Observable";

export class TaskRenderObservable extends Observable {
    constructor(observers) {
        super(observers);
    }
}