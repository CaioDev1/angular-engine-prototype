import template from './visitor-list-page.template.js'
import style from './visitor-list-page.style.js'
import Component from '../../core/component.js'

const COMPONENT_SELECTOR = 'visitors-list-page'

const VisitorsListPage = (injectedServices) => {
    class VisitorsListPageComponent extends HTMLElement {
        constructor(services=injectedServices) {
            super()

            this.visitors = services.Visitors.list

            new Component(this, template, style)

            services.Component.instances[VisitorsListPageComponent.name] = this
        }
    }

    return VisitorsListPageComponent
}

export default {
    component: VisitorsListPage,
    selector: COMPONENT_SELECTOR
}