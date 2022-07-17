export default class FormBuilder {
    constructor() {

    }

    coreServiceBoostrap(contextComponent) {
        contextComponent.querySelectorAll('[formGroup]').forEach(element => {
            element.querySelectorAll('[formControlName]').forEach(field => {
                if(field.type != 'input') {
                    field.addEventListener('change', e => {
                        console.log('evento onchange', field)
                    })
                } else {
                    field.addEventListener('keyup', e => {
                        console.log('evento keyup', field)
                    })
                }
            })
        })
    }
}