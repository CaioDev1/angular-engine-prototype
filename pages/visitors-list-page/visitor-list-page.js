import template from './visitor-list-page.template.js'

const COMPONENT_SELECTOR = 'visitors-list-page'

const VisitorsListPage = (bootstrap, injectedServices) => {
    if(bootstrap) {
        const VisitorsListPageComponent = class extends HTMLElement {
            constructor(services=injectedServices) {
                super()
    
                this.innerHTML = template(services.Visitors.list)
    
                VisitorsListPageComponent.instance = this
            }
    
            static getInstance() {
                return VisitorsListPageComponent.instance
            }
    
            static get selectorName() {
                return COMPONENT_SELECTOR
            }
        }

        customElements.define(VisitorsListPageComponent.selectorName, VisitorsListPageComponent);
    
        return VisitorsListPageComponent
    }

    return customElements.get(COMPONENT_SELECTOR)
}

export default VisitorsListPage