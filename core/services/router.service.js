export default class Router {
    constructor() {
        Router.instance = this
    }

    onRouteLinkClick(callback) {
        window.addEventListener('click', e => {
            if(e.target.matches('[routeLink]')) {
                e.preventDefault()
        
                const selectedRoutePath = e.target.getAttribute('routeLink')
        
                this.navigateTo(selectedRoutePath)

                callback()
            }
        })
    }

    getRouteParams(param) {
        return new URLSearchParams(window.location.search).get(param)
    }

    onNavigatorChanges(callback) {
        window.onpopstate = () => callback()
    }

    static getInstance() {
        return Router.instance
    }

    navigateTo(url) {
        history.pushState('', '', url)
    }
}