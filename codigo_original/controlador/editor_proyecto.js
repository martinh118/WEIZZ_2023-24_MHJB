import {FilaContenedor} from '../SRC/clases/FilaContenedor.js';


let fila = new FilaContenedor(1, 2);
let fila2 = new FilaContenedor(2, 3);
let fila3 = new FilaContenedor(3, 1);

$("#bodyProject").append(fila2.getRow());
$("#bodyProject").append(fila.getRow());
$("#bodyProject").append(fila3.getRow());