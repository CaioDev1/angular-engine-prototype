import template from './entrances-list-page.template.js'
import style from './entrances-list-page.style.js'
import Component from '../../core/component.js'

const COMPONENT_SELECTOR = 'entrances-list-page'

const EntrancesListPage = (injectedServices) => {
    const teste = {texto: 'asdfasdfasdf'}
    class EntrancesListPageComponent extends HTMLElement {
        constructor(services=injectedServices) {
            super()

            this.title = teste
            console.log(this.title, typeof this.title)
            console.log(teste, typeof teste)
            this.entrances = services.Entrances.list
            
            EntrancesListPageComponent.instance = this
            services.Component.instances[EntrancesListPageComponent.name] = this
            
            new Component(EntrancesListPageComponent, template, style)
        }

        static getInstance() {
            return EntrancesListPageComponent.instance
        }

        static get selectorName() {
            return COMPONENT_SELECTOR
        }

        testedeScript(...args) {
            console.log('CHEGOU NO MÉTODOOO', ...args)
        }

        removeEntrance(entranceId) {
            const entranceToRemoveIndex = this.entrances.findIndex(entrance => entrance.id == entranceId)
            
            if(entranceToRemoveIndex != -1) {
                this.entrances.splice(entranceToRemoveIndex, 1)
            
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