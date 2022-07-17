import eventsList from './events-list.js'
export default class Component {
    constructor(componentInstance, template, style, initialState={}) {
        this.componentInstance = componentInstance
        this.componentTemplateFactory = template
        this.componentStyle = style

        this.componentDOM = undefined

        this.hooks = initialState

        this.initializeComponent()
    }
    
    initializeComponent() {
        this.initializeRefreshListener()

        this.render()
    }

    initializeDOMTemplateEventListeners() {
        Object.keys(eventsList).forEach(key => {
            this.componentDOM.querySelectorAll(`[${key}]`).forEach(element => {
                const eventStringToExecute = element.getAttribute(key)

                const {eventMethods, eventMethodArgs} = this.verifyBindMethods(eventStringToExecute)

                element.addEventListener(eventsList[key], event => {
                    try {
                        const scope = {component: this.componentInstance, hooks: this.hooks}
                        if(eventMethods && eventMethodArgs && eventMethodArgs.some(arg => arg == '$event')) scope.$event = event

                        const transpiledStringToExecute = eventStringToExecute
                            .replaceAll('$app', 'this.component') 
                            .replaceAll('$event', 'this.$event')
                            .replaceAll('$hooks', 'this.hooks')

                        this.scopedEval(scope, transpiledStringToExecute)
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
        if(this.hooks) {
            this.hooks = new Proxy(this.hooks, {
                set: (target, changedKey, changedValue, receiver) => {
                    Reflect.set(target, changedKey, changedValue, receiver)
    
                    this.render()
    
                    return true;
                }
            })
        }
    }

    render() {        
        const componentTemplate = this.componentTemplateFactory(this.hooks)
        
        this.componentDOM = new DOMParser().parseFromString(componentTemplate, 'text/html').body

        const styleTag = document.createElement('style')            
        styleTag.textContent = this.componentStyle
        this.componentDOM.appendChild(styleTag)

        this.initializeDOMTemplateEventListeners()

        this.componentInstance.innerHTML = ''

        this.componentDOM.childNodes.forEach(child => {
            this.componentInstance.appendChild(child)
        })
    }

    verifyBindMethods(stringToExecute) {
        const componentMethodsNames = this.getAllComponentMethodsNames()

        const eventMethods = stringToExecute.match(/([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/g)
        let eventMethodArgs = []

        if(eventMethods) {
            eventMethods.forEach(eventMethodName => {
                if(!componentMethodsNames.includes(eventMethodName)) throw new Error(`Bind method "${eventMethodName}" does not exist on component: ${EntrancesListPagethis.name}`)
                
                eventMethodArgs = /\(\s*([^)]+?)\s*\)/.exec(eventMethods);
    
                if (eventMethodArgs[1]) {
                    eventMethodArgs = eventMethodArgs[1].split(/\s*,\s*/)
                }
            })
            

            //const formattedMethodsList = 

            return {
                eventMethods: eventMethods ? eventMethods : [],
                eventMethodArgs
            }
        }

        return {eventMethods: []}
    }

    formatComponentInputBinds() {

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