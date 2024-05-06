
import { FilaContenedor } from '../../SRC/clases/FilaContenedor.js';
import { Proyecto } from '../../SRC/clases/Proyecto.js';
import { Container } from '../../SRC/clases/Container.js';
import { aplicarEventListener } from './aplicar_event_listener.js';
import { Fila } from '../../SRC/clases/Fila.js';
import { BotonesContainer } from '../../SRC/clases/BotonesContainer.js';

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
$(document).ready(function () {

  let idProject = document.getElementById("idProject").innerHTML;

  $("#guardarCambios").click(function () {
    fetch("../modelo/configuracion_proyecto/modelo_guardar_cambios_proyecto.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "id": idProject, "proyecto": JSON.stringify(proyecto) })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al solicitar guardar el nuevo proyecto.');
        }
        // Devuelve la respuesta como JSON
        return response.json();
      })
      .then(data => {
        $("#proyectoGuardadoMessage").show()
        setTimeout(() => { $("#proyectoGuardadoMessage").hide() }, 3000);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    $("#proyecto").html(proyecto.getHtmlBase());
    aplicarEventListener(proyecto);

  });
})

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
      for (let v of value) {
        let f = Fila.fromJSON(v);
        f.rewriteHtml();
        containers.push(f);
      };
      return containers;

    } else if (key == "containersHijo") {

      let containers = [];
      for (let v of value){ 
        let c = Container.fromJSON(v);
        c.rewriteHTML();
        containers.push(c);
      };
      return containers;

    } else if (key == "filasContenedor") {

      let containers = [];
      for (let v of value) {
        let fc = FilaContenedor.fromJSON(v);
        fc.rewriteHTML();
        containers.push(fc);
      };
      return containers;

    } else {
      return value;   // 'nom' i altres atributs "normals"
    }
  });

  let project = Proyecto.fromJSON(newProject);
  project.rewriteHtml();
  return project;
}


function init() {
  if (contenidoProyecto != null) {
    // console.log(JSON.parse(contenidoProyecto));
    proyecto = transformarJson(contenidoProyecto);

    $("#proyecto").html(proyecto.getHtmlBase());
    aplicarEventListener(proyecto);

    $("#proyectoGuardadoMessage").hide();
  }
  // const urlArchivoPHP = '../../vista/editor_proyecto.php';


}

window.onload = init();
