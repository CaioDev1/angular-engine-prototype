import eventsList from './events-list.js'
export default class Component {
    constructor(componentClass, template, style) {
        this.componentClass = componentClass
        this.componentTemplateFactory = template
        this.componentStyle = style

        this.componentDOM = undefined
        //this.noProxyComponentInstance = this.componentInstance.cloneNode(true)

        this.initializeComponent()
    }

    get componentInstance() {
        return this.componentClass.getInstance()
    }
    
    initializeComponent() {
        const componentTemplate = this.componentTemplateFactory(this.componentInstance)

        this.componentDOM = new DOMParser().parseFromString(componentTemplate, 'text/html').body
        
        this.initializeDOMTemplateEventListeners()

        const styleTag = document.createElement('style')            
        styleTag.textContent = this.componentStyle
        this.componentInstance.appendChild(styleTag)

        this.componentDOM.childNodes.forEach(child => {
            this.componentInstance.appendChild(child)
        })

        this.initializeRefreshListener()
    }



    initializeDOMTemplateEventListeners() {
        const componentMethodsNames = this.getAllComponentMethodsNames()

        Object.keys(eventsList).forEach(key => {
            this.componentDOM.querySelectorAll(`[${key}]`).forEach(element => {
                const eventStringToExecute = element.getAttribute(key)
                
                const eventMethodName = eventStringToExecute.match(/([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/g)[0]
                if(!componentMethodsNames.includes(eventMethodName)) throw new Error(`Bind method "${eventMethodName}" does not exist on component: ${EntrancesListPagethis.name}`)

                let args = /\(\s*([^)]+?)\s*\)/.exec(eventStringToExecute);

                if (args[1]) {
                    args = args[1].split(/\s*,\s*/)
                }

                element.addEventListener(eventsList[key], event => {
                    try {
                        const scope = {component: this.componentInstance}
                        if(args && args.some(arg => arg == '$event')) scope.$event = event

                        const transpiledStringToExecute = eventStringToExecute
                            .replaceAll('$app', 'this.component') 
                            .replaceAll('$event', 'this.$event')

                        this.scopedEval(scope, transpiledStringToExecute)

                        console.log(this.componentInstance.title)
                    } catch (error) {
                        console.error(`Error ocurred while trying to transpile the app expression\nExpression: ${error}`)
                        throw new Error(error)   
                    }
                })

                element.removeAttribute(key)
            })
        })
    }

    initializeRefreshListener() {
        Object.setPrototypeOf(this.componentInstance, new Proxy(Object.create(this.componentClass.prototype), {
            set: (target, changedKey, changedValue, receiver) => {
                Reflect.set(target, changedKey, changedValue, receiver)

                this.refresh(target, receiver)

                return true;
            }
        }))
    }

    refresh(target, receiver) {        
        const componentTemplate = this.componentTemplateFactory(this.componentInstance)
        
        this.componentDOM = new DOMParser().parseFromString(componentTemplate, 'text/html').body

        this.initializeDOMTemplateEventListeners()

        Reflect.set(target, 'innerHTML', '', receiver)

        this.componentDOM.childNodes.forEach(child => {
            this.componentInstance.appendChild(child)
        })
    }

    getAllComponentMethodsNames() {
        const props = []

        let obj = this.componentInstance

        do {
            props.push(...Object.getOwnPropertyNames(obj))
        } while (obj = Object.getPrototypeOf(obj))
        
        return props.sort().filter((e, i, arr) => { 
           if (e != arr[i+1] && typeof this.componentInstance[e] == 'function') return true
        })
    }

    scopedEval(scope, script) {
        return Function(`"use strict"; ${script}`).bind(scope)()
    }
}