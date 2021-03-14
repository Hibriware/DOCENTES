import React from "react";
import {Button} from '@material-ui/core';

const KardexButton = ({onDowloade, control,periodo}: any) => {
    const handleDescargarPdf = () => {
        if(control && periodo){
            onDowloade(control,periodo)
        }else{
            alert("Ingrese un numero de control")
        }
    }
    return <Button variant="contained" color="secondary" onClick={handleDescargarPdf}>
        Descargar Kardex
    </Button>
}

export default KardexButton;
