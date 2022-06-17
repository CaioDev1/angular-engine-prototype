import template from './entrances-form-page.template.js'


const COMPONENT_SELECTOR = 'entrances-form-page'

const EntrancesFormPage = (bootstrap, services) => {
    if(bootstrap) {
        const EntrancesFormPageComponent = class extends HTMLElement {
            constructor(a=services) {
                super()
    
                this.innerHTML = template

                const entranceId = services.Router.getRouteParams('entrance_id')

                if(entranceId) {
                    const form = this.querySelector('form')

                    const selectedEntrance = services.Entrances.list.find(entrance => entrance.id == entranceId)
                    const entranceVisitor = services.Visitors.list.find(visitor => {
                        if(visitor.visitor_id == selectedEntrance.entrance_visitor_id) return true
                    })

                    form.elements['visitor_id'].value = entranceVisitor.visitor_id
                    form.elements['visitor_name'].value = entranceVisitor.visitor_name
                    form.elements['visitor_age'].value = entranceVisitor.visitor_age
                    form.elements['visitor_address'].value = entranceVisitor.visitor_address

                    form.elements['entrance_type'].value = selectedEntrance.entrance_type,
                    form.elements['entrance_reason'].value = selectedEntrance.entrance_reason
                }

                this.querySelector('form').addEventListener('submit', event => {
                    event.preventDefault()
                    
                    const formData = new FormData(event.target);
        
                    const data = Array.from(formData.entries()).reduce((memo, [key, value]) => ({
                        ...memo,
                        [key]: value,
                    }), {})
        
                    const newVisitorData = {
                        visitor_id: data.visitor_id,
                        visitor_name: data.visitor_name,
                        visitor_age: data.visitor_age,
                        visitor_address: data.visitor_address
                    }

                    const newEntranceData = {
                        entrance_type: data.entrance_type,
                        entrance_visitor_id: data.visitor_id,
                        entrance_reason: data.entrance_reason,
                        entrance_start_date: new Date().toString(),
                        entrance_end_prevision: new Date().setDate(new Date().getDate() + 1).toString(),
                    }

                    if(!entranceId) {
                        services.Visitors.add(newVisitorData)
    
                        services.Entrances.add(newEntranceData)
                    } else {
                        services.Entrances.list = services.Entrances.list.map(entrance => {
                            if(entrance.id == entranceId) {
                                entrance = newEntranceData

                                services.Visitors.list = services.Visitors.list.map(visitor => {
                                    if(visitor.visitor_id == entrande.entrance_visitor_id)
                                        visitor = newVisitorData
                                })
                            }
                        }) 
                    }

                    services.Router.navigateTo('/')
                })
        
                EntrancesFormPageComponent.instance = this
        
                EntrancesFormPageComponent.prototype.testeDoComponent = function() {
                    
                }
            }
    
            static getInstance() {
                return EntrancesFormPageComponent.instance
            }
    
            static get selectorName() {
                return COMPONENT_SELECTOR
            }
        }

        customElements.define(EntrancesFormPageComponent.selectorName, EntrancesFormPageComponent);

        return EntrancesFormPageComponent
    }
    

    return customElements.get(COMPONENT_SELECTOR) 
}

export default EntrancesFormPage