
import { FilaContenedor } from '../../SRC/clases/FilaContenedor.js';
import { Proyecto } from '../../SRC/clases/Proyecto.js';
import { Container } from '../../SRC/clases/Container.js';
import { aplicarEventListener } from './aplicar_event_listener.js';
import base_basico from '../../SRC/plantillas_base/plantilla_base_basico.json' assert { type: 'json' };


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
  proyecto = transformarJson(proyecto);
  $("#proyecto").html(proyecto.getHtmlBase());
  $("#proyectoGuardadoMessage").show()
  setTimeout(() => { $("#proyectoGuardadoMessage").hide() }, 3000);

});

/**
 * Obtiene los datos del proyecto en formato JSON y descarga el archivo.
 */
$("#descargarJson").click(function () {
  let jsonProject = JSON.stringify(proyecto);

  // Crear un objecte similar a un arxiu format per bytes
  const file = new Blob([jsonProject], { type: 'text/plain' });

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
      for (let v of value) {
        let filaContenedor = FilaContenedor.fromJSON(v);
        containers.push(filaContenedor);
      }
      return containers;
    } else if (key == "containersHijo") {
      let containers = [];
      for (let v of value) containers.push(Container.fromJSON(v));
      return containers;
    } else {
      return value;   // 'nom' i altres atributs "normals"
    }
  });
  let project = Proyecto.fromJSON(newProject);
  return project;
}

/**
 * 
 */
function init() {
  let base = "base_basico";

  switch (base) {
    case "base_basico":
      proyecto = transformarJson(base_basico);
      $("#proyecto").html(proyecto.getHtmlBase());
      aplicarEventListener(proyecto);
      break;

    default:
      proyecto = new Proyecto(1);
      let fila1 = new FilaContenedor("FilaContenedor-1",1);
      let fila2 = new FilaContenedor("FilaContenedor-2",2);
      let fila3 = new FilaContenedor("FilaContenedor-3",3);
      proyecto.setBody([fila1,fila2,fila3]);
      $("#proyecto").html(proyecto.getHtmlBase());

      break;
  }

  $("#proyectoGuardadoMessage").hide();

  
}


window.onload = init();
