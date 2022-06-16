import template from './app-navbar.template.js'

class NavBar extends HTMLElement {
    constructor() {
        super()

        this.innerHTML = template

        NavBar.instance = this
    }

    static getInstance() {
        return NavBar.instance
    }
}

export default {
    selectorName: 'app-navbar',
    component: NavBar
}