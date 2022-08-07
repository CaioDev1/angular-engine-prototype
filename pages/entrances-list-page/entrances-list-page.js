import template from './entrances-list-page.template.js'
import style from './entrances-list-page.style.js'
import AppComponent from '../../core/component.js'

const COMPONENT_SELECTOR = 'entrances-list-page'

const EntrancesListPage = (injectedServices) => {
    class EntrancesListPageComponent extends HTMLElement {
        constructor({Entrances, Component}=injectedServices) {
            super()

            const initialHooks = {
                title: false,
                entrances: Entrances
            }

            Component.instances[EntrancesListPageComponent.name] = this
            
            this.component = new AppComponent(
                this, 
                template, 
                style, 
                EntrancesListPageComponent.name,
                injectedServices,
                initialHooks
            )
        }

        testedeScript(...args) {
            console.log('CHEGOU NO MÉTODOOO', ...args)
        }

        removeEntrance(entranceId) {
            const entranceToRemoveIndex = this.component.hooks.entrances.entrances.findIndex(entrance => entrance.id == entranceId)
            
            if(entranceToRemoveIndex != -1) {
                this.component.hooks.entrances.entrances.splice(entranceToRemoveIndex, 1)

                this.component.render()
            }
        }
    }

    return EntrancesListPageComponent
}

export default {
    component: EntrancesListPage,
    selector: COMPONENT_SELECTOR
}