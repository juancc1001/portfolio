const nombre = document.getElementById("nombre");
const documento = document.getElementById("documento");
const apellido = document.getElementById("apellido");
const indice = document.getElementById("indice");
const form = document.getElementById("form");
const btnGuardar = document.getElementById("btn-guardar");
const listaveterinarios = document.getElementById("lista-veterinarios");
const url = "https://veterinaria-backend-beta.vercel.app/veterinarios";
let veterinarios = [];

async function listarveterinarios() {
  try {
    const respuesta = await fetch(url);
    const veterinariosDelServer = await respuesta.json();
    if (Array.isArray(veterinariosDelServer)) {
      veterinarios = veterinariosDelServer;
    }
    if (veterinarios.length > 0) {
      const htmlveterinarios = veterinarios
        .map(
          (veterinaria, index) => `<tr>
        <th scope="row">${index + 1}</th>
        <td>${veterinaria.documento}</td>
        <td>${veterinaria.nombre}</td>
        <td>${veterinaria.apellido}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
            </div>
        </td>
      </tr>`
        )
        .join("");
      listaveterinarios.innerHTML = htmlveterinarios;
      Array.from(document.getElementsByClassName("editar")).forEach(
        (botonEditar, index) => (botonEditar.onclick = editar(index))
      );
      Array.from(document.getElementsByClassName("eliminar")).forEach(
        (botonEliminar, index) => (botonEliminar.onclick = eliminar(index))
      );
      return;
    }else{
    listaveterinarios.innerHTML = `<tr>
    <td colspan="5" class="lista-vacia">No hay veterinarios</td>
    </tr>`;
    }
  } catch (error) {
    console.log({ error });
    $(".alert").show();
  }
}

async function enviarDatos(evento) {
  evento.preventDefault();
  try {
    const datos = {
      nombre: nombre.value,
      apellido: apellido.value,
      documento: documento.value,
    };
    const accion = btnGuardar.innerHTML;
    let urlEnvio = url;
    let method = "POST";
    if (accion === "Editar") {
      urlEnvio += `/${indice.value}`;
      method = "PUT";
    }
    const respuesta = await fetch(urlEnvio, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
      mode: "cors",
    });
    if (respuesta.ok) {
      listarveterinarios();
      resetModal();
    }
  } catch (error) {
    console.log({ error });
    $(".alert").show();
  }
}

function editar(index) {
  return function click() {
    btnGuardar.innerHTML = "Editar";
    $("#ModalCenter").modal("toggle");
    const veterinaria = veterinarios[index];
    indice.value = index;
    nombre.value = veterinaria.nombre;
    apellido.value = veterinaria.apellido;
    documento.value = veterinaria.documento;
  };
}

function resetModal() {
  indice.value = "";
  nombre.value = "";
  apellido.value = "";
  documento.value = "";
  btnGuardar.innerHTML = "Crear";
}

function eliminar(index) {
  const urlEnvio = `${url}/${index}`;
  return async function clickEnEliminar() {
    try {
      const respuesta = await fetch(urlEnvio, {
        method: "DELETE",
        mode: "cors",
      });
      if (respuesta.ok) {
        listarveterinarios();
      }
    } catch (error) {
      console.log({ error });
      $(".alert").show();
    }
  };
}

listarveterinarios();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
