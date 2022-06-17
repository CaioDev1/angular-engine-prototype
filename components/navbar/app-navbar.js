import template from './app-navbar.template.js'

const COMPONENT_SELECTOR = 'app-navbar'

const NavBar = (bootstrap, ...props) => {
    if(bootstrap) {
        const NavBarComponent = class extends HTMLElement {
            constructor(a=props) {
                super()
    
                this.innerHTML = template
    
                NavBarComponent.instance = this
            }
    
            static getInstance() {
                return NavBarComponent.instance
            }
    
            static get selectorName() {
                return COMPONENT_SELECTOR
            }
        }

        customElements.define(NavBarComponent.selectorName, NavBarComponent);

        return NavBarComponent
    }
    

    return customElements.get(COMPONENT_SELECTOR) 
}

export default NavBar