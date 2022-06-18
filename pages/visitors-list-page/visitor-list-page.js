import template from './visitor-list-page.template.js'
import style from './visitor-list-page.style.js'

const COMPONENT_SELECTOR = 'visitors-list-page'

const VisitorsListPage = (injectedServices) => {
    class VisitorsListPageComponent extends HTMLElement {
        constructor(services=injectedServices) {
            super()

            this.innerHTML = template(services.Visitors.list)
            this.style.cssText = style

            VisitorsListPageComponent.instance = this
            services.Component.instances[VisitorsListPageComponent.name] = this
        }

        static getInstance() {
            return VisitorsListPageComponent.instance
        }

        static get selectorName() {
            return COMPONENT_SELECTOR
        }
    }

    return VisitorsListPageComponent
}

export default {
    component: VisitorsListPage,
    selector: COMPONENT_SELECTOR
}