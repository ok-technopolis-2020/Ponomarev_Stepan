export class AbstractView {
    constructor() {}

    destroy() {
        throw new Error("Need implement");
    }
}