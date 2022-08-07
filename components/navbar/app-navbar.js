import template from './app-navbar.template.js'
import style from './app-navbar.style.js'
import AppComponent from '../../core/component.js'

const COMPONENT_SELECTOR = 'app-navbar'

const NavBar = (injectedServices) => {
    class NavBarComponent extends HTMLElement {
        constructor({Component}=injectedServices) {
            super()

            Component.instances[NavBarComponent.name] = this

            this.component = new AppComponent(
                this, 
                template, 
                style, 
                NavBarComponent.name,
                injectedServices,
            )
        }
    }

    return NavBarComponent
}

export default {
    component: NavBar,
    selector: COMPONENT_SELECTOR
}