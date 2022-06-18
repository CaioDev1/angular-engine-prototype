import template from './app-navbar.template.js'
import style from './app-navbar.style.js'

const COMPONENT_SELECTOR = 'app-navbar'

const NavBar = (injectedServices) => {
    class NavBarComponent extends HTMLElement {
        constructor(services=injectedServices) {
            super()

            this.innerHTML = template
            this.style.cssText = style

            NavBarComponent.instance = this
            services.Component.instances[NavBarComponent.name] = this
        }

        static getInstance() {
            return NavBarComponent.instance
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