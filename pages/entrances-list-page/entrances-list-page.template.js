export default (entrances) => /*html*/`
    <app-navbar></app-navbar>
    <h1>HOME - PORTARIA</h1>
    <button routeLink="/form" class="btn btn-lg btn-warning col-3 my-3">Nova entrada</button>
    <table class="table">
        <thead>
            <th scope="col">Id</th>
            <th scope="col">Tipo da visita</th>
            <th scope="col">Motivo</th>
            <th scope="col">Data de entrada</th>
            <th scope="col">Previsão de saída</th>
            <th scope="col">Opções</th>
        </thead>
        ${
            entrances.map(entrance => {                
                return /*html*/`<tr>
                    <td scope='row'>${entrance.id}</td>
                    <td scope='row'>${entrance.entrance_type_name}</td>
                    <td>${entrance.entrance_reason}</td>
                    <td>${entrance.entrance_start_date}</td>
                    <td>${entrance.entrance_end_prevision}</td>
                    <td>
                        <button routeLink="/form?entrance_id=${entrance.id}" class="btn btn-sm btn-success">EDITAR</button> | 
                        <!-- <button removeButton="${entrance.id}" class="btn btn-sm btn-primary">REGISTRAR SAÍDA</button> -->
                        <button onclick="testeDeEscopo(event)" class="btn btn-sm btn-primary">REGISTRAR SAÍDA</button>
                    </td>
                </tr>`
            })
        }
    </table>
    <!-- <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="mr-auto">Entradas</strong>
        </div>
        <div class="toast-body" style="background: red; color: white;">
            sdfsdf
        </div>
    </div>

    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="mr-auto">Entradas</strong>
        </div>
        <div class="toast-body" style="background: green; color: white;">
            sdfsdf
        </div>
    </div> -->
`