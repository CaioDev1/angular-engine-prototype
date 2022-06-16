// DEFAULT STYLE
import defaultStyle from './style.js'

import EntrancesListPage from './pages/entrances-list-page/entrances-list-page.js'
import EntrancesFormPage from './pages/entrances-form-page/entrances-form-page.js'
import VisitorsListPage from './pages/visitors-list-page/visitor-list-page.js'
import NavBar from './components/navbar/app-navbar.js'

const routes = [
    {path: '/', renderComponent: EntrancesListPage.component},
    {path: '/form', renderComponent: EntrancesFormPage.component},
    {path: '/visitors', renderComponent: VisitorsListPage.component},
]

const applicationDeclarations = [
    EntrancesListPage,
    EntrancesFormPage,
    VisitorsListPage,
    NavBar
]

const appComponentInstances = {}

function loadDefaultStyle() {
    const styleTag = document.createElement('style')
    
    styleTag.innerHTML = defaultStyle

    document.head.appendChild(styleTag)
}

function loadCurrentPage() {
    const foundRoute = routes.find(r => r.path == location.pathname)

    if(foundRoute) {
        const currentComponent = appComponentInstances[foundRoute.renderComponent.name]

        document.querySelector('.root').innerHTML = currentComponent.innerHTML
    } else {
        history.replaceState('', '', '/')
        loadCurrentPage()
    }
}

window.addEventListener('click', e => {
    if(e.target.matches('[routeLink]')) {
        e.preventDefault()

        const selectedRoutePath = e.target.getAttribute('routeLink')

        history.pushState('', '', selectedRoutePath)
        loadCurrentPage()
    }
})


function initializeDeclarations() {
    applicationDeclarations.forEach(componentData => {
        customElements.define(componentData.selectorName, componentData.component)

        appComponentInstances[componentData.component.name] = new componentData.component()
    })
}

window.onpopstate = () => loadCurrentPage()

initializeDeclarations()
loadDefaultStyle()
loadCurrentPage()