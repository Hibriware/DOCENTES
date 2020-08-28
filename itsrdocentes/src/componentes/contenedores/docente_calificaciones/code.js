

function codes () {
    let LIMITE = 100;

   

    if(LIMITE > 0){
        let c1 , c2 , c3, c4;
        c1=prompt("c1","23")
        c2=prompt("c2","")
        c3=prompt("c3","")
        c4=prompt("c4","")

        LIMITE = LIMITE - c1;
        LIMITE = LIMITE - c2;
        LIMITE = LIMITE - c3;
        LIMITE = LIMITE - c4;

    }else if(LIMITE===0){
        console.log("DESBLOKETAR")
    }

}

codes()