var personas = [];
function obtenerPersonas() {
    axios({
        method:'GET',
        url: 'http://127.0.0.1:8000/personas/list',
        responseType: 'json'
    }).then(response => {
        console.log(response);
        this.personas = response.data.datos
        llenarTabla();
    }).catch(err => {
        console.log(err);
    });
}
obtenerPersonas();

function llenarTabla() {
    for (let i = 0; i < personas.length; i++) {
        document.querySelector('#tablaPersonas tbody').innerHTML += 
        `
            <tr>
                <td>${personas[i].id}</td>
                <td>${personas[i].Nombre}</td>
                <td>${personas[i].edad}</td>
                <td>
                    <button type="button" class='btn btn-info' onclick='editar'(${i})>Editar</button>
                    <button type="button" class='btn btn-danger' onclick='eliminar'(${i})>Eliminar</button>
                </td>
            </tr>
        `;
    }
}

function eliminar(indice) {
    console.log('eliminando con el indice: '+index)
}