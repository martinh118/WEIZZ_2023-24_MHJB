import { Proyecto } from '../../SRC/clases/Proyecto.js';
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

$("#guardarCambios").click(function () {
  console.log(proyecto.getContainers());
  let jsonProject = JSON.stringify(proyecto.toJSON());
  // console.log(jsonProject);

  let newProject = Proyecto.fromJSON(JSON.parse(jsonProject));
  // console.log(newProject);
  proyecto = newProject;
  $("#proyecto").html(proyecto.getHtmlBase());
});

function init() {

  proyecto = new Proyecto(1);
  $("#proyecto").html(proyecto.getHtmlBase());
}


window.onload = init();
