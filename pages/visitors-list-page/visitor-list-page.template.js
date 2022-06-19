export default (component) => /*html*/`
    <app-navbar></app-navbar>
    <div id="accordion">
        ${
            component.visitors.map((visitor, i) => {
                return (/*html*/`
                    <div class="card text-start">
                        <div class="card-header" id="heading${i}">
                            <h5 class="mb-0">
                                <button class="btn btn-link w-100 text-start" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                                    ${i + 1} - ${visitor.visitor_name}
                                </button>
                            </h5>
                        
                            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordion">
                                <div class="card-body text-start">
                                    <h6>Informações do visitante</h6>
                                    <ul>
                                        <li><strong>RG:</strong> ${visitor.visitor_id}</li>
                                        <li><strong>Idade:</strong> ${visitor.visitor_age}</li>
                                        <li><strong>Endereço:</strong> ${visitor.visitor_address}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>`)
            })
        }
    </div>
`