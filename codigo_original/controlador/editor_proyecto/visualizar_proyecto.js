$("#visualizarPagina").click(function(){
    let id = document.getElementById("idProject").innerHTML;
    console.log(id);
    window.open("./visualizar_proyecto.php?idProject=" + id);
})

