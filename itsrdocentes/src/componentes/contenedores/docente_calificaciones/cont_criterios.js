import React from 'react';
import {dataCriterios, putCriteriosc1, putCriteriosc2, putCriteriosc3, putCriteriosc4 }from '../../servicios/api'

export const EnviarCriterios= async (bam ,porcentage, criterio, updates) => {//parametros update periodo, materia, unidad, grupo
    console.log(bam)
    let materia = dataCriterios[0].materias_idmaterias;
    let unidad = dataCriterios[0].numUnidad;
   let grupo = dataCriterios[0].asingnacion_grupo_id;
   switch(bam){
       case 1:
        await putCriteriosc1(materia, unidad, grupo, porcentage, criterio)
           break;
       case 2:
        await putCriteriosc2(materia, unidad, grupo, porcentage, criterio)
           break;
        case 3:
        await putCriteriosc3(materia, unidad, grupo, porcentage, criterio)
            break;
        case 4:
        await putCriteriosc4(materia, unidad, grupo, porcentage, criterio)
            break;

            default:
                return'Error'
console.log('fin fin')
   }
    await updates(materia,unidad)
    return true
  }//fin
