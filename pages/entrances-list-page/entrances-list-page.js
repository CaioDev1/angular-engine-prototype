import template from './entrances-list-page.template.js'

const COMPONENT_SELECTOR = 'entrances-list-page'

const EntrancesListPage = (bootstrap, injectedServices) => {
    if(bootstrap) {
        const EntrancesListPageComponent = class extends HTMLElement {
            constructor(services=injectedServices) {
                super()
    
                this.innerHTML = template(services.Entrances.list)

                EntrancesListPageComponent.instance = this

                console.log(services)
            }
    
            static getInstance() {
                return EntrancesListPageComponent.instance
            }
    
            static get selectorName() {
                return COMPONENT_SELECTOR
            }
        }

        customElements.define(EntrancesListPageComponent.selectorName, EntrancesListPageComponent);
    
        return EntrancesListPageComponent
    }

    return customElements.get(COMPONENT_SELECTOR) 
}

export default EntrancesListPage