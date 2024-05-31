import { proyecto } from "./editor_proyecto.js";

/**
 * Aplica el eventListener para abrir el visualizador del proyecto.
 */
$("#visualizarPagina").click(function () {
    let id = document.getElementById("idProject");
    if (id != null) {
        id = id.innerHTML;
        fetch("../modelo/configuracion_proyecto/modelo_guardar_cambios_proyecto.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "id": id, "proyecto": JSON.stringify(proyecto) })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hubo un problema al solicitar guardar el nuevo proyecto.');
                }

                return response.json();
            })
            .then(data => {
                window.open("./visualizar_proyecto.php?idProject=" + id);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        let form = document.createElement("form");
        form.method = "POST";
        form.action = "./visualizar_proyecto.php";
        form.target = "_blank";

        let input = document.createElement("input");
        input.type = "hidden";
        input.name = "contenido";
        input.value = JSON.stringify(proyecto);
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();
    }



})

