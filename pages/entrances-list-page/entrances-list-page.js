import template from './entrances-list-page.template.js'
import style from './entrances-list-page.style.js'

const COMPONENT_SELECTOR = 'entrances-list-page'

const EntrancesListPage = (injectedServices) => {
    class EntrancesListPageComponent extends HTMLElement {
        constructor(services=injectedServices) {
            super()

            this.innerHTML = template(services.Entrances.list)
            this.style.cssText = style

            this.querySelector('[removeButton]') && this.querySelector('[removeButton]').addEventListener('click', e => {
                const entranceToRemoveIndex = services.Entrances.list.findIndex(entrance => entrance.id == e.target.getAttribute('removeButton'))
            
                if(entranceToRemoveIndex != -1) {
                    services.Entrances.list.splice(entranceToRemoveIndex, 1)
                
                    this.innerHTML = template(services.Entrances.list)
                }
            })

            EntrancesListPageComponent.instance = this
        }

        static getInstance() {
            return EntrancesListPageComponent.instance
        }

        static get selectorName() {
            return COMPONENT_SELECTOR
        }

        triggerRefresh() {
            this.innerHTML = template(services.Entrances.list)
        }
    }

    return EntrancesListPageComponent
}

export default {
    component: EntrancesListPage,
    selector: COMPONENT_SELECTOR
}