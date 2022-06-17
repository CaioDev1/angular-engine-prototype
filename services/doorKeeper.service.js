export class Entrances {

    constructor() {
       this.entrances = []

       Entrances.instance = this
    }

    static getInstance() {
        return Entrances.instance
    }

    get list() {
       return this.entrances
    }

    add(newEntrance) {
        newEntrance.id = this.entrances.length + 1

        switch(newEntrance.entrance_type) {
            case "1": newEntrance.entrance_type_name = 'Fornecedor'; break
            case "2": newEntrance.entrance_type_name = 'Parente do inquilino'; break
            case "3": newEntrance.entrance_type_name = 'Potencial cliente'; break
            case "4": newEntrance.entrance_type_name = 'Técnico'; break
        }

        this.entrances.push(newEntrance)
    }

    update() {
        
    }

    delete(id) {
        
    }
}

export class Exits {

    constructor() {
       this.exits = []

       Exits.instance = this
    }

    static getInstance() {
        return Exits.instance
    }

    get list() {
       return this.exits
    }

    add(newExit) {
        this.exits.push(newExit)
    }

    update() {
        
    }

    delete(id) {
        
    }
}

export class Visitors {

    constructor() {
       this.visitors = []

       Visitors.instance = this
    }

    static getInstance() {
        return Visitors.instance
    }

    get list() {
       return this.visitors
    }

    add(newVisitor) {
        this.visitors.push(newVisitor)
    }

    update() {
        
    }

    delete(id) {
        
    }
}