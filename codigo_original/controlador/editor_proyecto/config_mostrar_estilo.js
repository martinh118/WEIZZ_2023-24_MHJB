import { RecuadroArrastrable } from '../../SRC/clases/RecuadroArrastrable.js';
import { crearElemento, crearDobleElemento, añadirHijos, añadirMismoAtributos } from '../../SRC/librerias/APIElementosHTML.js';


$("#mostrarEstilo").click(function () {
    var selection = document.querySelector('#cuadroEstilo') !== null;
  
    if (!selection) {
  
      let offsetX, offsetY, isDragging = false;
      let cuadroEstilo = new RecuadroArrastrable("cuadroEstilo", "Estilo", null);
      let elementoEstilo = cuadroEstilo.getRecuadro();
      let cerrarElementoEstilo;
  
      elementoEstilo.style.left = 65 + "em";
      elementoEstilo.style.top = 10 + "em";
      $("#proyecto").append(elementoEstilo);
  
  
      cerrarElementoEstilo = document.getElementById("cerrarcuadroEstilo");
      cerrarElementoEstilo.addEventListener("click", function () {
  
        let cuadro = document.getElementById("cuadroEstilo");
        cuadro.remove();
      });
  
      elementoEstilo.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - elementoEstilo.getBoundingClientRect().left;
        offsetY = e.clientY - elementoEstilo.getBoundingClientRect().top;
      });
  
      document.addEventListener('mousemove', (e) => {
        e.preventDefault;
        if (isDragging) {
          const x = e.clientX - offsetX;
          const y = e.clientY - offsetY;
  
          elementoEstilo.style.left = x + 'px';
          elementoEstilo.style.top = y + 'px';
        }
      });
  
      document.addEventListener('mouseup', () => {
        isDragging = false;
      });
  
  
    }
  });
  