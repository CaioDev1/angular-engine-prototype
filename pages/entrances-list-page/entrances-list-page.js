import template from './entrances-list-page.template.js'
import style from './entrances-list-page.style.js'

const COMPONENT_SELECTOR = 'entrances-list-page'

const EntrancesListPage = (injectedServices) => {
    class EntrancesListPageComponent extends HTMLElement {
        constructor(services=injectedServices) {
            super()

            this.services = services

            const shadowDOM = this.attachShadow({mode: 'open'})
            shadowDOM.innerHTML = template(this.services.Entrances.list)

            const styleTag = document.createElement('style')
            styleTag.textContent = style

            shadowDOM.appendChild(styleTag)

            this.querySelector('[removeButton]') && this.querySelector('[removeButton]').addEventListener('click', e => {
                const entranceToRemoveIndex = this.services.Entrances.list.findIndex(entrance => entrance.id == e.target.getAttribute('removeButton'))
            
                if(entranceToRemoveIndex != -1) {
                    this.services.Entrances.list.splice(entranceToRemoveIndex, 1)
                
                    shadowDOM.innerHTML = template(this.services.Entrances.list)
                }
            })

            EntrancesListPageComponent.instance = this
            this.services.Component.instances[EntrancesListPageComponent.name] = this
        }

        static getInstance() {
            return EntrancesListPageComponent.instance
        }

        static get selectorName() {
            return COMPONENT_SELECTOR
        }

        triggerRefresh() {
            this.shadowRoot.innerHTML = template(this.services.Entrances.list)
        }
    }

    return EntrancesListPageComponent
}

export default {
    component: EntrancesListPage,
    selector: COMPONENT_SELECTOR
}