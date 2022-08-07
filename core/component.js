import eventsList from './events-list.js'
export default class Component {
    constructor(componentInstance, template, style, componentClassName, componentServices, initialState={}) {
        this.componentInstance = componentInstance
        this.componentTemplateFactory = template
        this.componentStyle = style
        this.componentClassName = componentClassName
        this.componentServices = componentServices

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

                element.addEventListener(eventsList[key], event => {
                    try {
                        const scope = {$app: this.componentInstance, $hooks: this.hooks, $event: event}

                        if(eventStringToExecute.includes('$event')) scope

                        this.scopedEval(scope, eventStringToExecute)
                    } catch (error) {
                        console.error(`
                            Error ocurred while trying to run the app expression
                            Expression: "${eventStringToExecute}"
                            Component: ${this.componentClassName}

                            ${error.message}
                        `)
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
        const componentTemplate = this.componentTemplateFactory(this.hooks, this.componentServices)
        
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

    scopedEval(scope, script) {
        return Function(`
            "use strict";

            const $app = this.$app;
            const $hooks = this.$hooks;
            const $event = this.$event; 

            ${script}
        `).bind(scope)()
    }
}