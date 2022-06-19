import template from './entrances-list-page.template.js'
import style from './entrances-list-page.style.js'
import Component from '../../core/component.js'
import eventsList from '../../core/events-list.js'

const COMPONENT_SELECTOR = 'entrances-list-page'

const EntrancesListPage = (injectedServices) => {
    class EntrancesListPageComponent extends HTMLElement {
        constructor(services=injectedServices) {
            super()
            this.entrances = services.Entrances.list

            const componentTemplate = template(this)

            const componentDOM = new DOMParser().parseFromString(componentTemplate, 'text/html').body

            const componentMethodsNames = Component.getAllComponentMethodsNames(this)

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
                            const scope = {component: this}
                            if(args && args.some(arg => arg == '$event')) scope.$event = event

                            const transpiledStringToExecute = eventStringToExecute
                                .replaceAll('$app', 'this.component')   
                                .replaceAll('$event', 'this.$event')

                            this.scopedEval(scope, transpiledStringToExecute)
                        } catch (error) {
                            throw new Error(`Error ocurred while trying to transpile the app expression\nExpression: ${error}`)   
                        }
                    })
                })
            })

            const styleTag = document.createElement('style')
            
            styleTag.textContent = style

            this.appendChild(styleTag)

            componentDOM.childNodes.forEach(teste => {
                this.appendChild(teste)
            })

            EntrancesListPageComponent.instance = this
            services.Component.instances[EntrancesListPageComponent.name] = this
        }

        static getInstance() {
            return EntrancesListPageComponent.instance
        }

        static get selectorName() {
            return COMPONENT_SELECTOR
        }

        scopedEval(scope, script) {
            return Function(`"use strict"; ${script}`).bind(scope)()
        }

        testedeScript(...args) {
            console.log('CHEGOU NO MÉTODOOO', ...args)
        }

        removeEntrance(entranceId) {
            console.log(entranceId)
            const entranceToRemoveIndex = this.entrances.findIndex(entrance => entrance.id == entranceId)
            
            if(entranceToRemoveIndex != -1) {
                this.entrances.splice(entranceToRemoveIndex, 1)
            
                this.triggerRefresh()
            }
        }

        triggerRefresh() {
            this.innerHTML = template(this)
        }
    }

    return EntrancesListPageComponent
}

export default {
    component: EntrancesListPage,
    selector: COMPONENT_SELECTOR
}