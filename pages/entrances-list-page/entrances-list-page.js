export class EntrancesListPage {
    constructor($) {
        $('.toast').toast({
            animation: true,
            autohide: true,
            delay: 3000
        })
        
        $('.toast').toast('show')
    }
}