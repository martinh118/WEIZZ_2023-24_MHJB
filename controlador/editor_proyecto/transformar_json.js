import { FilaContenedor } from '../../SRC/clases/FilaContenedor.js';
import { Proyecto } from '../../SRC/clases/Proyecto.js';
import { Container } from '../../SRC/clases/Container.js';
import { Fila } from '../../SRC/clases/Fila.js';
import { Imagen } from '../../SRC/clases/Elementos/Imagen.js';
import { Lista } from '../../SRC/clases/Elementos/Lista.js';
import { Tabla } from '../../SRC/clases/Elementos/Tabla.js';
import { Texto } from '../../SRC/clases/Elementos/Texto.js';
import { Titulo } from '../../SRC/clases/Elementos/Titulo.js';

/**
 * Deserializa el contenido JSON como objetos de las clases creadas.
 * @param {JSON} archivoJson: contenido JSON
 * @returns {Proyecto} devuelve la variable como objeto Proyecto con el contenido del proyecto.
 */
export function transformarJson(archivoJson) {
    let jsonProject = JSON.stringify(archivoJson);

    let newProject = JSON.parse(jsonProject, function (key, value) {
        let containers = [];
        switch (key) {
            case "body":
                containers = [];
                for (let v of value) {
                    let f = Fila.fromJSON(v);
                    f.rewriteHTML();
                    containers.push(f);
                };
                return containers;
            case "containersHijo":
                containers = [];
                for (let v of value) {
                    let c = Container.fromJSON(v);
                    c.rewriteHTML();
                    containers.push(c);
                };
                return containers;
            case "filasContenedor":
                containers = [];
                for (let v of value) {
                    let fc = FilaContenedor.fromJSON(v);
                    fc.rewriteHTML();
                    containers.push(fc);
                };
                return containers;
            case "elementoHijo":
                if (value != null) {
                    return elegirElementoHijo(value);
                }
            default:
                return value;

        }
    });

    let project = Proyecto.fromJSON(newProject);
    project.rewriteHTML();
    return project;
}

/**
* Deserializa el contenido de "value" dependiendo del contenido del identificador. Superclase Elemento 
* @param {JSON} value: contenido JSON 
* @returns {Titulo, Texto, Imagen, Lista, Tabla} 
*/
function elegirElementoHijo(value) {
    try {

        let idElemento = value.id;
        if (idElemento.includes("Titulo")) {
            let obj = Titulo.fromJSON(value);
            obj.rewriteHTML();
            return obj;
        }

        if (idElemento.includes("Texto")) {
            return Texto.fromJSON(value);
        }

        if (idElemento.includes("Imagen")) {
            return Imagen.fromJSON(value);
        }

        if (idElemento.includes("Lista")) {
            return Lista.fromJSON(value);
        }

        if (idElemento.includes("Tabla")) {
            return Tabla.fromJSON(value);
        }

    } catch (err) {
        console.error(err);
    }

}