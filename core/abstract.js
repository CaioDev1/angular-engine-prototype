import { Component } from "./component.js";

export class Abstract {
    constructor() {
        if(new.target === Component) throw new Error('Abstract class cannot be instantialized.')
    }
}