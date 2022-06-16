import template from './entrances-form-page.template.js'

class EntrancesFormPage extends HTMLElement {
    constructor() {
        super()

        this.innerHTML = template

        EntrancesFormPage.instance = this
    }

    static getInstance() {
        return EntrancesFormPage.instance
    }
}

export default {
    selectorName: 'entrances-form-page',
    component: EntrancesFormPage
}