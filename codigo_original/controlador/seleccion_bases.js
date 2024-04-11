
$("document").ready(function(){
    $(".cuadroBase").click(function(event){
        let idBase = event.target.id;
        console.log(event.target);
        console.log(idBase);
    })
})