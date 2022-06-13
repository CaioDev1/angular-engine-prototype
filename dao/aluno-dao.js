const mysql = require('mysql2')

class Entrances {

    constructor() {
       this.entrances = []
    }

    get list() {
       return this.entrances
    }

    save(newEntrance) {
        this.entrances.push(newEntrance)
    }

    update(aluno) {
        
    }

    delete(id) {
        
    }
}

class Exits {

    constructor() {
       this.exits = []
    }

    get list() {
       return this.exits
    }

    save(newExit) {
        this.exits.push(newExit)
    }

    update(aluno) {
        
    }

    delete(id) {
        
    }
}

class Visitors {

    constructor() {
       this.visitors = []
    }

    get list() {
       return this.visitors
    }

    save(newVisitor) {
        this.visitors.push(newVisitor)
    }

    update(aluno) {
        
    }

    delete(id) {
        
    }
}

