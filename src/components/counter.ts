export default class Counter {
    private Current: number = 0;

    constructor(num: number){
        this.Current = num;
    }

    get Next(): number {
        this.Current++;
        return this.Current;
    }

    setCurrent(num: number){
        this.Current = num;
    }

}