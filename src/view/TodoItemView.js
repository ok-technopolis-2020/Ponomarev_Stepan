const { AbstractView } = require("./AbstractView");

export class TodoItemView extends AbstractView {
    #task;

    #taskItemElement;
    #checkBoxElement;
    #inputFieldElement;
    #spanFieldElement;
    #removeTaskButtonElement;

    #completeTaskEvent;
    #inputFieldFocusinEvent;
    #inputFieldFocusoutEvent;
    #removeTaskEvent;

    constructor(task, completeTaskEvent, inputFieldFocusinEvent, inputFieldFocusoutEvent, removeTaskEvent) {
        super();
        this.#task = task;
        this.#completeTaskEvent = completeTaskEvent;
        this.#removeTaskEvent = removeTaskEvent;
        this.#inputFieldFocusinEvent = inputFieldFocusinEvent;
        this.#inputFieldFocusoutEvent = inputFieldFocusoutEvent;
        this.#taskItemElement = this.#createElement();
        this.#initEvents();
    }

    destroy() {
        this.#checkBoxElement.removeEventListener('click', this.#completeTaskEvent);
        this.#inputFieldElement.removeEventListener('focusin', this.#inputFieldFocusinEvent);
        this.#inputFieldElement.removeEventListener('focusout', this.#inputFieldFocusoutEvent);
        this.#removeTaskButtonElement.removeEventListener('click', this.#removeTaskEvent);
    }

    get taskItemElement() {
        return this.#taskItemElement;
    }

    get taskId() {
        return this.#task.id;
    }

    #createElement() {
        const li = document.createElement('li');

        this.#createCheckBox();
        this.#createInputField();
        this.#createSpanField();
        this.#createRemoveTaskButton();

        li.classList.add('todo-list__item');
        li.append(this.#checkBoxElement, this.#inputFieldElement, this.#spanFieldElement, this.#removeTaskButtonElement);

        return li;
    }

    #createCheckBox() {
        const checkBox = document.createElement('input');

        checkBox.type = 'checkbox';
        checkBox.checked = this.#task.completed;
        checkBox.classList.add('todo-list__complete-button');
        checkBox.setAttribute('aria-label', 'complete task');

        this.#checkBoxElement = checkBox;
    }

    #createInputField() {
        const inputField = document.createElement('input');

        inputField.type = 'text';
        inputField.classList.add('todo-list__text', 'todo-list__text_thin_font', 'changed-font');
        inputField.value = this.#task.text;

        this.#inputFieldElement = inputField;
    }

    #createSpanField() {
        const spanField = document.createElement('span');

        spanField.classList.add('todo-list__text', 'todo-list__text_thin_font', 'changed-font');
        spanField.textContent = this.#task.text;

        this.#spanFieldElement = spanField;
    }

    #createRemoveTaskButton() {
        const button = document.createElement('button');

        button.classList.add('todo-list__remove-task-button');
        button.setAttribute('aria-label', 'remove item');

        this.#removeTaskButtonElement = button;
    }

    #initEvents() {
        this.#checkBoxElement.addEventListener('click', this.#completeTaskEvent);
        this.#inputFieldElement.addEventListener('focusin', this.#inputFieldFocusinEvent);
        this.#inputFieldElement.addEventListener('focusout', this.#inputFieldFocusoutEvent);
        this.#removeTaskButtonElement.addEventListener('click', this.#removeTaskEvent);
    }
}