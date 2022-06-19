export default class Component {
    constructor(componentSelector, componentClass) {

    }

    static getAllComponentMethodsNames(componentInstance) {
        const props = [];
        let obj = componentInstance;
        do {
            props.push(...Object.getOwnPropertyNames(obj));
        } while (obj = Object.getPrototypeOf(obj));
        
        return props.sort().filter((e, i, arr) => { 
           if (e!=arr[i+1] && typeof componentInstance[e] == 'function') return true;
        });
    }
}