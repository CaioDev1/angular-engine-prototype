// DEFAULT STYLE
import defaultStyle from './style.js'

// COMPONENTS
import EntrancesListPage from './pages/entrances-list-page/entrances-list-page.js'
import EntrancesFormPage from './pages/entrances-form-page/entrances-form-page.js'
import VisitorsListPage from './pages/visitors-list-page/visitor-list-page.js'
import NavBar from './components/navbar/app-navbar.js'

// SERVICES
import {Entrances, Exits, Visitors} from './services/doorKeeper.service.js'
import Router from './services/router.service.js'

const routes = [
    {path: '/', renderComponent: EntrancesListPage},
    {path: '/form', renderComponent: EntrancesFormPage},
    {path: '/visitors', renderComponent: VisitorsListPage},
]

const applicationDeclarations = [
    EntrancesListPage,
    EntrancesFormPage,
    VisitorsListPage,
    NavBar
]

const applicationServices = [
    Entrances,
    Exits,
    Visitors,
    Router,
    class Component {
        constructor() {
            this.instances = {}
        }
    }
]

const serviceInstances = {}

function loadDefaultStyle() {
    const styleTag = document.createElement('style')
    
    styleTag.innerHTML = defaultStyle()

    document.head.appendChild(styleTag)
}

function loadCurrentPage() {
    const foundRoute = routes.find(r => r.path == location.pathname)

    if(foundRoute) {
        const currentComponentSelector = foundRoute.renderComponent.selector

        document.querySelector('.root').innerHTML = `<${currentComponentSelector}></${currentComponentSelector}>`        
    } else {
        history.replaceState('', '', '/')
        loadCurrentPage()
    }
}

function initializeServices() {
    applicationServices.forEach(Service => {
        serviceInstances[Service.name] = new Service()
    })
}

function initializeDeclarations() {
    applicationDeclarations.forEach(Component => {
        customElements.define(Component.selector, Component.component(serviceInstances))
    })
}

initializeServices()
initializeDeclarations()
loadDefaultStyle()
loadCurrentPage()

Router.getInstance().onRouteLinkClick(loadCurrentPage)
Router.getInstance().onNavigatorChanges(loadCurrentPage)