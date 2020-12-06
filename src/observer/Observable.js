export class Observable {
    observerList;

    constructor(observerList) {
        this.observerList = observerList;
    }

    changed() {
        this.observerList.forEach(observer => {
            observer.signal();
        });
    }
}