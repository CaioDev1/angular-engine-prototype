import template from './entrances-form-page.template.js'
import style from './entrances-form-page.style.js'
import AppComponent from '../../core/component.js'


const COMPONENT_SELECTOR = 'entrances-form-page'

const EntrancesFormPage = (injectedServices) => {
    class EntrancesFormPageComponent extends HTMLElement {
        constructor({
            Router,
            Entrances,
            Visitors,
            Component
        }=injectedServices) {
            super()

            this.Router = Router
            this.Entrances = Entrances
            this.Visitors = Visitors

            this.component = new AppComponent(
                this, 
                template, 
                style, 
                EntrancesFormPageComponent.name,
                injectedServices,
            )

            this.component.hooks.entranceId = this.Router.getRouteParams('entrance_id')

            const form = this.querySelector('form')

            if(this.component.hooks.entranceId) {
                const selectedEntrance = this.Entrances.list.find(entrance => entrance.id == this.component.hooks.entranceId)
                const entranceVisitor = this.Visitors.list.find(visitor => {
                    if(visitor.visitor_id == selectedEntrance.entrance_visitor_id) return true
                })

                form.elements['visitor_id'].value = entranceVisitor.visitor_id
                form.elements['visitor_name'].value = entranceVisitor.visitor_name
                form.elements['visitor_age'].value = entranceVisitor.visitor_age
                form.elements['visitor_address'].value = entranceVisitor.visitor_address

                form.elements['entrance_type'].value = selectedEntrance.entrance_type,
                form.elements['entrance_reason'].value = selectedEntrance.entrance_reason
            }
    
            Component.instances[EntrancesFormPageComponent.name] = this
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

            if(!this.component.hooks.entranceId) {
                this.Visitors.add(newVisitorData)

                this.Entrances.add(newEntranceData)
            } else {
                this.Entrances.list = this.Entrances.list.map(entrance => {
                    if(entrance.id == this.component.hooks.entranceId) {
                        entrance = newEntranceData

                        this.Visitors.list = this.Visitors.list.map(visitor => {
                            if(visitor.visitor_id == entrance.entrance_visitor_id)
                                visitor = newVisitorData
                        })
                    }
                }) 
            }

            this.Router.navigateTo('/')
        }
    }

    return EntrancesFormPageComponent
}

export default {
    component: EntrancesFormPage,
    selector: COMPONENT_SELECTOR
}