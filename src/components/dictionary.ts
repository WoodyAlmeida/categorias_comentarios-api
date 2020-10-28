export default class Dictionary<T> {
    private count: number = 0;
    private nextUniqueId: number = 1;
    // private maxSize: number = 0;

    private objs: {
        [key: number]: T;
    } = {

        };

    get size() {
        return this.count;
    }

    add(id: number, element: T) {
        if (!this.objs[id]) {
            this.objs[id] = element;
            this.count++;
            this.nextUniqueId++;
        }
    }

    remove(id: number) {
        delete this.objs[id];
        this.count--;
    }

    getNextId(){
        return this.nextUniqueId;
    }

    get(id: number) {
        return this.objs[id];
    }

    contains(id: number): boolean {
        try {
            let pObj = this.objs[id];

            if (pObj)
                if (pObj !== null)
                    return true;
            return false;
        } catch {
            return false;
        }
    }

    map(cb: (element: T, index: number, originalIndex: string | number) => any): any {
        let _i = 0;
        for (let index in this.objs) {
            let element = this.objs[index];
            if (cb)
                if (cb(element, _i, index))
                    return true;
            _i++;
        }
    }

    toArray(): T[]{
        let arr: T[] = [];
        this.map((e) => {
            arr.push(e);
        });

        return arr;
    }

    filter(validatorFunction: (element: T) => boolean, idKey = 'id'){
        let filtered = new Dictionary<T>();
        this.map((element: any) => {
            if (validatorFunction(element))
                filtered.add(element[idKey], element);
        });

        return filtered;
    }

}