// DEFAULT STYLE
import defaultStyle from './style.js'

import {EntrancesListPage} from './pages/entrances-list-page/entrances-list-page.js'
import {EntrancesFormPage} from './pages/entrances-form-page/entrances-form-page.js'

const routes = [
    {path: '/', render: EntrancesListPage},
    {path: '/form', render: EntrancesFormPage},
]

const applicationDeclarations = [
    EntrancesListPage,
    EntrancesFormPage
]

function loadDefaultStyle() {
    const styleTag = document.createElement('style')
    
    styleTag.innerHTML = defaultStyle

    document.head.appendChild(styleTag)
}

function loadCurrentPage() {
    const foundRoute = routes.find(r => r.path == location.pathname)

    if(foundRoute) {
        document.querySelector('.root').innerHTML = new foundRoute.render().templateFileName
    } else {
        history.replaceState('', '', '/')
        loadCurrentPage()
    }
}

window.addEventListener('click', e => {
    if(e.target.matches('[routeLink]')) {
        e.preventDefault()

        history.pushState('', '', e.target.href)
        loadCurrentPage()
    }
})


function initializaDependencies(pageName) {
    
}

loadDefaultStyle()
loadCurrentPage()