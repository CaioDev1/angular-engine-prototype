import template from './visitor-list-page.template.js'
import style from './visitor-list-page.style.js'
import AppComponent from '../../core/component.js'

const COMPONENT_SELECTOR = 'visitors-list-page'

const VisitorsListPage = (injectedServices) => {
    class VisitorsListPageComponent extends HTMLElement {
        constructor({Visitors, Component}=injectedServices) {
            super()

            Component.instances[VisitorsListPageComponent.name] = this
           
            this.component = new AppComponent(
                this, 
                template, 
                style,
                VisitorsListPageComponent.name,
                injectedServices,
            )
        }
    }

    return VisitorsListPageComponent
}

export default {
    component: VisitorsListPage,
    selector: COMPONENT_SELECTOR
}