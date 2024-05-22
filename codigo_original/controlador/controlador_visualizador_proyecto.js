import { transformarJson } from "./editor_proyecto/transformar_json.js";

let proyecto;


function eliminarEstilos(){
    let contenedoresHijo = document.querySelectorAll(".containerHijo");
    let grupoBotones = document.querySelectorAll('[id*="botones"]');
    let filaRow = document.querySelectorAll('[id*="FilaRow"]');
    let applyBoton = document.querySelectorAll('[id*="apply"]');
    let baseFilaContenedor = document.querySelectorAll('[data-elemento="baseFilaContenedor"]');
    let botonesBackground = document.querySelectorAll('[class*="estiloBackground"]');
    
    botonesBackground.forEach(cH => {
      cH.setAttribute("hidden", "");
  });

    contenedoresHijo.forEach(cH => {
        cH.setAttribute("style", "margin: 10px; display:flex; align-items: center; justify-content: center;");
    });

    grupoBotones.forEach(gB => {
        gB.remove();
    });

    baseFilaContenedor.forEach(fC => {
      fC.setAttribute("class", "container d-flex justify-content-center");
    });

    filaRow.forEach(fR => {
      fR.setAttribute("class", "row mx-auto");
    });

    applyBoton.forEach(aB => {
      aB.remove();
  });

}

function init() {
    if (contenidoProyecto != null) {
      proyecto = transformarJson(contenidoProyecto);
  
      $("#visualizadorProyecto").html(proyecto.getHtmlBase());
      eliminarEstilos();
    }
  
  }

window.onload = init();
