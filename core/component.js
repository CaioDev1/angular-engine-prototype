import eventsList from './events-list.js'
export default class Component {
    constructor() {

    }

    static initializeComponent(componentInstance, template, style) {
        const componentTemplate = template(componentInstance)

        const componentDOM = new DOMParser().parseFromString(componentTemplate, 'text/html').body

        const componentMethodsNames = Component.getAllComponentMethodsNames(componentInstance)

        Object.keys(eventsList).forEach(key => {
            componentDOM.querySelectorAll(`[${key}]`).forEach(element => {
                const eventStringToExecute = element.getAttribute(key)
                
                const eventMethodName = eventStringToExecute.match(/([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/g)[0]
                if(!componentMethodsNames.includes(eventMethodName)) throw new Error(`Bind method "${eventMethodName}" does not exist on component: ${EntrancesListPageComponent.name}`)

                let args = /\(\s*([^)]+?)\s*\)/.exec(eventStringToExecute);

                if (args[1]) {
                    args = args[1].split(/\s*,\s*/)
                }

                element.addEventListener(eventsList[key], event => {
                    try {
                        const scope = {component: componentInstance}
                        if(args && args.some(arg => arg == '$event')) scope.$event = event

                        const transpiledStringToExecute = eventStringToExecute
                            .replaceAll('$app', 'this.component')   
                            .replaceAll('$event', 'this.$event')

                        Component.scopedEval(scope, transpiledStringToExecute)
                    } catch (error) {
                        console.error(`Error ocurred while trying to transpile the app expression\nExpression: ${error}`)
                        throw new Error(error)   
                    }
                })

                element.removeAttribute(key)
            })
        })

        const styleTag = document.createElement('style')            
        styleTag.textContent = style
        componentInstance.appendChild(styleTag)

        componentDOM.childNodes.forEach(child => {
            componentInstance.appendChild(child)
        })

        Component.initializeRefreshListener(componentInstance)
    }

    static initializeRefreshListener(component) {
        Object.setPrototypeOf(component, new Proxy(Object.create(HTMLElement.prototype), {
            set(...args) {
                console.log("Valor mudou");

                //this.refresh()
                return true;
            }
        }))
    }

    static refresh() {
        this.innerHTML = template(this)
    }

    static getAllComponentMethodsNames(componentInstance) {
        const props = []

        let obj = componentInstance

        do {
            props.push(...Object.getOwnPropertyNames(obj))
        } while (obj = Object.getPrototypeOf(obj))
        
        return props.sort().filter((e, i, arr) => { 
           if (e != arr[i+1] && typeof componentInstance[e] == 'function') return true
        })
    }

    static scopedEval(scope, script) {
        return Function(`"use strict"; ${script}`).bind(scope)()
    }
}