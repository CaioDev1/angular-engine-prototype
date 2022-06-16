import template from './entrances-list-page.template.js'

class EntrancesListPage extends HTMLElement {
    constructor() {        
        super()

        this.innerHTML = template

        EntrancesListPage.instance = this
    }

    static getInstance() {
        return EntrancesListPage.instance
    }
}

export default {
    selectorName: 'entrances-list-page',
    component: EntrancesListPage
}