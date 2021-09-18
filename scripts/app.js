//cambia las mesas de apagada a prendida y viceversa
function cambiar(elemento){
    //recibe el id del elemento(imagen especifica) y creamos variables para manipular los elementos asociados
    let mesaBillar = document.getElementById(elemento);
    let horaInicial = document.getElementById("relojInicio" + elemento[elemento.length - 1]);
    let horaFinal = document.getElementById("relojFin" + elemento[elemento.length - 1]);
    let total = document.getElementById("total" + elemento[elemento.length - 1]);


    //Si la mesa esta apagada, entonces se prende y viceversa
    if(mesaBillar.src.match("images/billarOFF.png")){
        mesaBillar.src = "images/billarON.png";

        //prende el reloj de inicio y marca la mesa como en uso
        horaInicial.innerHTML = horaActual();
        horaFinal.innerHTML = "*En uso*";
        total.innerHTML = "0.00$";

        //Actualiza en tiempo real el total
        setInterval(()=>{
            let duracionUso = calcularDiferencia(horaInicial.innerHTML, horaActual());
            total.innerHTML = ((duracionUso * 50) / 60).toFixed(2) + "$";
        },5000);

    } else{
        mesaBillar.src = "images/billarOFF.png";

        //imprime el reloj de final
        horaFinal.innerHTML = horaActual();

        clearInterval(intervalID);

        //se calcula cuanto tiempo se utilizó la mesa de billar en minutos y luego se imprime
        let duracionUso = calcularDiferencia(horaInicial.innerHTML, horaFinal.innerHTML);

        total.innerHTML = ((duracionUso * 50) / 60).toFixed(2) + "$";
    }
    
}

//devuelve la hora actual
function horaActual(){
    momentoActual = new Date();
    hora = momentoActual.getHours();
    minuto = momentoActual.getMinutes();
    segundo = momentoActual.getSeconds();

    return hora + ":" + minuto + ":" + segundo;
}

//se recibe una hora inicial y final y se devuelve la diferencia entre ellas en minutos
function calcularDiferencia(a, b){
    let hora1 = b.split(":"),
        hora2 = a.split(":"),
        t1 = new Date(),
        t2 = new Date();

    t1.setHours(hora1[0], hora1[1], hora1[2]);
    t2.setHours(hora2[0], hora2[1], hora2[2]);

    let diff = Math.abs(t1 - t2); 

    return Math.floor((diff/1000)/60);
}

