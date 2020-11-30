export class Observable {
    observerList;

    constructor(observerList) {
        this.observerList = observerList; 
    }

    changed() {
        throw new Error("Need implement this method");
    }
}