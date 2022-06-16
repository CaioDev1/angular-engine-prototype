import template from './visitor-list-page.template.js'

class VisitorsListPage extends HTMLElement {
    constructor() {
        super()

        this.innerHTML = template

        VisitorsListPage.instance = this
    }

    static getInstance() {
        return VisitorsListPage.instance
    }
}

export default {
    selectorName: 'visitors-list-page',
    component: VisitorsListPage
}