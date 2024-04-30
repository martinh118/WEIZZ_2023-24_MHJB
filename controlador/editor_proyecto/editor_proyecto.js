
import { FilaContenedor } from '../../SRC/clases/FilaContenedor.js';
import { Proyecto } from '../../SRC/clases/Proyecto.js';
import { Container } from '../../SRC/clases/Container.js';
import { aplicarEventListener } from './aplicar_event_listener.js';
import { Fila } from '../../SRC/clases/Fila.js';
import { BotonesContainer } from '../../SRC/clases/BotonesContainer.js';
import base_basico from '../../SRC/plantillas_base/plantilla_base_basico.json' assert { type: 'json' };
import base_multiple from '../../SRC/plantillas_base/plantilla_base_multiple.json' assert { type: 'json' };
import pruebaJson from '../../SRC/plantillas_base/proyecto_pruebas_multiple.json' assert { type: 'json' };

let proyecto;
/**
 * Cierra todas los recuadros que esten actualmente abiertas.
 */
$("#cerrarPestañas").click(function () {
  var selectionEstilo = document.querySelector('#cuadroEstilo') !== null;
  var selectionElementos = document.querySelector('#cuadroElementos') !== null;
  var selectionCapas = document.querySelector('#cuadroCapas') !== null;
  let cuadroEstilo;
  let cuadroElementos;
  let cuadroCapas;

  if (selectionEstilo) {
    cuadroEstilo = document.querySelector('#cuadroEstilo');
    cuadroEstilo.remove();
  }
  if (selectionElementos) {
    cuadroElementos = document.querySelector('#cuadroElementos');
    cuadroElementos.remove();
  }
  if (selectionCapas) {
    cuadroCapas = document.querySelector('#cuadroCapas');
    cuadroCapas.remove();
  }

});

/**
 * Al clickar a la opción guardar, este guarda en formato JSON el proyecto a la base de datos con los datos del usuario.
 * Esta opción está inhabilitada para los usuarios anonimos.
 */
$("#guardarCambios").click(function () {

  var datos = {
    id: document.getElementById("idProject").innerHTML,
    proyecto: proyecto
  };

  // Realizar una solicitud AJAX para enviar el contenido HTML al servidor
  var xhr = new XMLHttpRequest();
  let rutaGuardar = "../modelo/configuracion_proyecto/modelo_guardar_cambios_proyecto.php";
  xhr.open("POST", rutaGuardar, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  // Envía el contenido HTML como JSON al servidor
  xhr.send(JSON.stringify({ datos }));

  // Manejar la respuesta del servidor si es necesario
  xhr.onload = function () {
    if (xhr.status === 200) {
      $("#proyectoGuardadoMessage").show()
      setTimeout(() => { $("#proyectoGuardadoMessage").hide() }, 3000);
    } else {
      console.error("Error al guardar el contenido HTML.");
    }
  };
  $("#proyecto").html(proyecto.getHtmlBase());
  aplicarEventListener(proyecto);


});

/**
 * Obtiene los datos del proyecto en formato JSON y descarga el archivo.
 */
$("#descargarJson").click(function () {
  let jsonProject = JSON.stringify(proyecto);

  // Crear un objecte similar a un arxiu format per bytes
  const file = new Blob([jsonProject], { type: 'text/json' });

  // Crear un link "fantasma" (no s'afegirà realment al document)
  const a = document.createElement('a');

  // Crear una URL que representa l'arxiu a descarregar
  a.href = URL.createObjectURL(file);
  // Indicar el nom de l'arxiu que es descarregarà
  a.download = "proyecto_pruebas.json";
  // Simular un clic sobre l'enllaç
  a.click();
  // Eliminar el link "fantasma"
  URL.revokeObjectURL(a.href);


});

function transformarJson(archivoJson) {
  let jsonProject = JSON.stringify(archivoJson);

  let newProject = JSON.parse(jsonProject, function (key, value) {
    if (key == "body") {

      let containers = [];
      for (let v of value) containers.push(Fila.fromJSON(v));
      return containers;

    } else if (key == "containersHijo") {

      let containers = [];
      for (let v of value) containers.push(Container.fromJSON(v));
      return containers;

    } else if (key == "filasContenedor") {

      let containers = [];
      for (let v of value) containers.push(FilaContenedor.fromJSON(v));
      return containers;

    } else if (key == "opcionesRow") {

      return BotonesContainer.fromJSON(value)

    }
    else {
      return value;   // 'nom' i altres atributs "normals"
    }
  });

  let project = Proyecto.fromJSON(newProject);
  project.rewriteHtml();
  return project;
}

/**
 * 
 */
function init() {
  let base = "base_multiple";
  proyecto = new Proyecto(1);
  let fila1 = new FilaContenedor("FilaContenedor-1", 1);
  let fila2 = new FilaContenedor("FilaContenedor-2", 2);
  let fila3 = new FilaContenedor("FilaContenedor-3", 3);
  let fila4 = new FilaContenedor("FilaContenedor-4", 4);
  let filaRow1, filaRow2;


  switch (base) {
    case "base_multiple":
      filaRow1 = new Fila("FilaRow-1", [fila1, fila2]);
      filaRow2 = new Fila("FilaRow-2", [fila3, fila4]);
      proyecto.setBody([filaRow1, filaRow2]);
      break;
    case "base_basico":
      filaRow1 = new Fila("FilaRow-1", [fila1]);
      filaRow2 = new Fila("FilaRow-2", [fila2]);
      let filaRow3 = new Fila("FilaRow-3", [fila3]);
      let filaRow4 = new Fila("FilaRow-4", [fila4]);
      proyecto.setBody([filaRow1, filaRow2, filaRow3, filaRow4]);
      break;

    default:
      console.log("nada");
      // proyecto = transformarJson(base_multiple);
      break;
  }

  $("#proyecto").html(proyecto.getHtmlBase());
  aplicarEventListener(proyecto);

  $("#proyectoGuardadoMessage").hide();


}

function initGet() {
  if (contenidoProyecto != null) {
    // console.log(JSON.parse(contenidoProyecto));
    proyecto = transformarJson(contenidoProyecto);

    $("#proyecto").html(proyecto.getHtmlBase());
    aplicarEventListener(proyecto);

    $("#proyectoGuardadoMessage").hide();
  }else {
    
  }
  // const urlArchivoPHP = '../../vista/editor_proyecto.php';


}

window.onload = initGet();
