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
    document.querySelector('#tablaPersonas tbody').innerHTML = '';
    for (let i = 0; i < personas.length; i++) {
        document.querySelector('#tablaPersonas tbody').innerHTML += 
        `
            <tr>
                <td>${personas[i].id}</td>
                <td>${personas[i].Nombre}</td>
                <td>${personas[i].edad}</td>
                <td>
                    <button type="button" class='btn btn-info' data-bs-toggle="modal" data-bs-target="#personasModal" onclick='seleccionar(${i})'>Info</button>
                    <button type="button" class='btn btn-danger' onclick='eliminar(${i})'>Eliminar</button>
                </td>
            </tr>
        `;
    }
}

function eliminar(indice) {
    axios({
        method:'DELETE',
        url: 'http://127.0.0.1:8000/personas/delete/'+indice,
        responseType: 'json'
    }).then(response => {
        console.log(response);
        obtenerPersonas();
    }).catch(err => {
        console.log(err);
    });
}

function guardar(){
    let persona = {
        Nombre: document.getElementById('Nombre').value,
        edad: document.getElementById('edad').value
    }
    axios({
        method:'POST',
        url: 'http://127.0.0.1:8000/personas/save',
        responseType: 'json',
        params: persona
    }).then(response => {
        console.log(response);
        document.getElementById('Nombre').value="";
        document.getElementById('edad').value="";
        obtenerPersonas();
    }).catch(err => {
        console.log(err);
    });
}

function seleccionar(indice) {
    axios({
        method:'GET',
        url: 'http://127.0.0.1:8000/personas/list/'+indice,
        responseType: 'json',
    }).then(response => {
        console.log(response);
        document.getElementById('Nombre').value=response.data.datos.Nombre,
        document.getElementById('edad').value=response.data.datos.edad
    }).catch(err => {
        console.log(err);
    });
}

function editar(params) {
}