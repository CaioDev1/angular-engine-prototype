export default /*html*/`
    <app-navbar></app-navbar>
    <h1>HOME - PORTARIA</h1>
    <button routeLink="/form" class="btn btn-lg btn-warning col-3 my-3">Nova entrada</button>
    <table class="table">
        <thead>
            <th scope="col">Id</th>
            <th scope="col">Motivo</th>
            <th scope="col">Data de entrada</th>
            <th scope="col">Previsão de saída</th>
            <th scope="col">Opções</th>
        </thead>
        <tr>
            <td scope='row'>sdfsdfsd</td>
            <td>sdfsdfsd</td>
            <td>sdfsdfsd</td>
            <td>sdfsdfsd</td>
            <td>
                <button routeLink="/form" class="btn btn-sm btn-success">EDITAR</button> | 
                <button class="btn btn-sm btn-primary">REGISTRAR SAÍDA</button>
            </td>
        </tr>
    </table>
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
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
    </div>
`