export default `
<h1>Cadastro</h1>
<form action="/entrances" method="POST">
    <input type="hidden" name="id" value=""/>
    <input type="text" name="nome" id="" placeholder="Nome" value="" class="form-control">
    <input type="email" name="email" id="" placeholder="Email" value="" class="form-control">
    <select name="curso" id="" class="form-select">
        <option value="" selected="disabled></option>
        <option value="ADS" selected="">Técnologo em ADS</option>
        <option value="IPI" selected="">Téc. em Informática para Internet</option>
        <option value="QUA" selected="">Téc. em Gestão de Qualidade</option>
    </select>
    <div class="d-grid gap-2">
        <button type="reset" class="btn btn-danger">Cancelar</button>
        <button type="submit" class="btn btn-primary">Salvar</button>
    </div>
</form>
`