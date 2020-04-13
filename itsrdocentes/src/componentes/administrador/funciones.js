import React from 'react';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import {crearRegistrosfechas} from '../servicios/api';


 export const Btn_evaluar = (fechas)=>{

    const enviar  = async ()=>{
        if (fechas.segunda > fechas.primera && fechas.tercera> fechas.segunda && fechas.final > fechas.tercera) {

            alert("creando fecha")
        } else {
            alert("ejemplo: la segunda entrega debe ser mayor a la primera entrega ")
        }


        console.log(moment(fechas.primera).format('DD/MM/YYYY') + ' primera')
        console.log(moment(fechas.segunda).format('DD/MM/YYYY') + ' segunda')
        console.log(moment(fechas.tercera).format('DD/MM/YYYY') + ' tercera')
        console.log(moment(fechas.final).format('DD/MM/YYYY') + ' final')

        //crearRegistrosfechas()//api

    
    
    }
    
        return(
            <div>
               <Button variant="outlined" color="primary"onClick={enviar} > Guardar</Button>
            </div>
        );
    }

    export default {Btn_evaluar}
