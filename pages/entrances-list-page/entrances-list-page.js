import template from './entrances-list-page.template.js'
import style from './entrances-list-page.style.js'
import Component from '../../core/component.js'

const COMPONENT_SELECTOR = 'entrances-list-page'

const EntrancesListPage = (injectedServices) => {
    class EntrancesListPageComponent extends HTMLElement {
        constructor(services=injectedServices) {
            super()

            const initialHooks = {title: false}

            initialHooks.entrances = services.Entrances.list

            services.Component.instances[EntrancesListPageComponent.name] = this
                        
            this.component = new Component(
                this, 
                template, 
                style, 
                initialHooks
            )
        }

        static get selectorName() {
            return COMPONENT_SELECTOR
        }

        testedeScript(...args) {
            console.log('CHEGOU NO MÉTODOOO', ...args)
        }

        removeEntrance(entranceId) {
            const entranceToRemoveIndex = this.component.hooks.entrances.findIndex(entrance => entrance.id == entranceId)
            
            if(entranceToRemoveIndex != -1) {
                this.component.hooks.entrances.splice(entranceToRemoveIndex, 1)
            
                this.triggerRefresh()
            }
        }
    }

    return EntrancesListPageComponent
}

export default {
    component: EntrancesListPage,
    selector: COMPONENT_SELECTOR
}