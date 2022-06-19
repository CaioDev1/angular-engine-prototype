import template from './entrances-form-page.template.js'
import style from './entrances-form-page.style.js'
import Component from '../../core/component.js'


const COMPONENT_SELECTOR = 'entrances-form-page'

const EntrancesFormPage = (injectedServices) => {
    class EntrancesFormPageComponent extends HTMLElement {
        constructor(services=injectedServices) {
            super()

            this.router = services.Router
            this.entrances = services.Entrances
            this.visitors = services.Visitors

            Component.initializeComponent(this, template, style)

            this.entranceId = this.router.getRouteParams('entrance_id')

            const form = this.querySelector('form')

            if(this.entranceId) {
                const selectedEntrance = this.entrances.list.find(entrance => entrance.id == this.entranceId)
                const entranceVisitor = this.visitors.list.find(visitor => {
                    if(visitor.visitor_id == selectedEntrance.entrance_visitor_id) return true
                })

                form.elements['visitor_id'].value = entranceVisitor.visitor_id
                form.elements['visitor_name'].value = entranceVisitor.visitor_name
                form.elements['visitor_age'].value = entranceVisitor.visitor_age
                form.elements['visitor_address'].value = entranceVisitor.visitor_address

                form.elements['entrance_type'].value = selectedEntrance.entrance_type,
                form.elements['entrance_reason'].value = selectedEntrance.entrance_reason
            }
    
            EntrancesFormPageComponent.instance = this
            services.Component.instances[EntrancesFormPageComponent.name] = this
    
            EntrancesFormPageComponent.prototype.testeDoComponent = function() {
                
            }
        }

        save(event) {
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

            if(!this.entranceId) {
                this.visitors.add(newVisitorData)

                this.entrances.add(newEntranceData)
            } else {
                this.entrances.list = this.entrances.list.map(entrance => {
                    if(entrance.id == this.entranceId) {
                        entrance = newEntranceData

                        this.visitors.list = this.visitors.list.map(visitor => {
                            if(visitor.visitor_id == entrande.entrance_visitor_id)
                                visitor = newVisitorData
                        })
                    }
                }) 
            }

            this.router.navigateTo('/')
        }

        static getInstance() {
            return EntrancesFormPageComponent.instance
        }

        static get selectorName() {
            return COMPONENT_SELECTOR
        }
    }

    return EntrancesFormPageComponent
}

export default {
    component: EntrancesFormPage,
    selector: COMPONENT_SELECTOR
}