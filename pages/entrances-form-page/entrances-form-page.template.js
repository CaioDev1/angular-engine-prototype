export default /*html*/`
<section class="py-4">
    <app-navbar></app-navbar>
    <h1>Cadastro</h1>
    <form>
        <fieldset class="form-group">
            <legend class="text-white text-start">Visitante</legend>
    
            <input type="hidden" name="id" />
            <input type="number" name="visitor_id" id="" placeholder="RG do visitante" class="form-control">
            <input type="text" name="visitor_name" id="" placeholder="Nome" class="form-control">
            <input type="number" name="visitor_age" id="" placeholder="Idade" class="form-control">
            <input type="text" name="visitor_address" id="" placeholder="Endereço" class="form-control">
        </fieldset>
        <fieldset class="form-group">
            <legend class="text-white text-start">Entrada</legend>
            
            <select name="entrance_type" id="" class="form-select">
                <option value="" selected disabled hidden>Escolha o tipo da visita</option>
                <option value="1">Fornecedor</option>
                <option value="2">Parente do inquilino</option>
                <option value="3">Potencial cliente</option>
                <option value="4">Técnico</option>
            </select>
            <textarea name="entrance_reason" placeholder="Motivo da entrada" class="form-control"></textarea>
        </fieldset>
        <div>
            <button type="button" routeLink="/" class="btn btn-danger mb-2">Cancelar</button>
            <button type="submit" class="btn btn-primary">Salvar</button>
        </div>
    </form>
</section>
`