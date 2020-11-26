export class AbstractView {
    constructor() {}

    destroy() {
        throw new Error("This method mus be implemented");
    }
}