import template from './app-navbar.template.js'
import style from './app-navbar.style.js'
import Component from '../../core/component.js'

const COMPONENT_SELECTOR = 'app-navbar'

const NavBar = (injectedServices) => {
    class NavBarComponent extends HTMLElement {
        constructor(services=injectedServices) {
            super()

            this.innerHTML = template
            this.style.cssText = style

            services.Component.instances[NavBarComponent.name] = this

            this.component = new Component(this, template, style)
        }

        static get selectorName() {
            return COMPONENT_SELECTOR
        }
    }

    return NavBarComponent
}

export default {
    component: NavBar,
    selector: COMPONENT_SELECTOR
}