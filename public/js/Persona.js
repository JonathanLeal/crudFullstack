var personas = [];
function obtenerPersonas() {
    axios({
        method:'GET',
        url: 'http://127.0.0.1:8000/personas/list',
        responseType: 'json'
    }).then(response => {
        console.log(response);
        this.personas = response.data
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
                    <button type="button" class='btn btn-info' data-bs-toggle="modal" data-bs-target="#personasModal" onclick='seleccionar(${personas[i].id})'>Info</button>
                    <button type="button" class='btn btn-danger' onclick='eliminar(${personas[i].id})'>Eliminar</button>
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
        data: persona
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
        document.getElementById('Nombre').value=response.data.Nombre,
        document.getElementById('edad').value=response.data.edad
        document.getElementById('btn-guardar').style.display = none;
        document.getElementById('btn-editar').style.display = block;
    }).catch(err => {
        console.log(err);
    });
}

function editar(params) {
}