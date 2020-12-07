import {dataCriterios, putCriteriosc1, putCriteriosc2, putCriteriosc3, putCriteriosc4 }from '../../servicios/api'

export const EnviarCriterios= async (bam ,porcentage, criterio,periodo, updates) => {//parametros update periodo, materia, unidad, grupo

    let materia = dataCriterios[0].materias_idmaterias;
    let unidad = dataCriterios[0].numUnidad;
    let grupo = dataCriterios[0].asingnacion_grupo_id;
    let materiaDocenteId = dataCriterios[0].materiaDocenteId;

   switch(bam){
       case 1:
        await putCriteriosc1(materia, unidad, grupo, porcentage, criterio,materiaDocenteId,periodo)
           break;
       case 2:
        await putCriteriosc2(materia, unidad, grupo, porcentage, criterio,materiaDocenteId,periodo)
            break;
        case 3:
        await putCriteriosc3(materia, unidad, grupo, porcentage, criterio,materiaDocenteId,periodo)
            break;
        case 4:
        await putCriteriosc4(materia, unidad, grupo, porcentage, criterio,materiaDocenteId,periodo)
        await updates(materia,unidad,materiaDocenteId)    
             break;

            default:
                return'Error'
   }
    return true
  }//fin
