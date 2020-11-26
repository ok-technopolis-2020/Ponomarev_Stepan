import { AbstractView } from "./AbstractView";

export class TodoAppView extends AbstractView {
    #addFormView;
    #todoListView;
    #contolPaneView;

    constructor(addFormView, todoListView, contolPaneView) {
        super();
        this.#addFormView = addFormView;
        this.#todoListView = todoListView;
        this.#contolPaneView = contolPaneView;
    }

    destroy() {
        
    }
} 