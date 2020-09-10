import React from 'react';
import {Buttons} from '../button/button';
import {infPdf} from '../columnasHeader/controller';

export const ActaFinal = (data) =>{
    return(
        <Buttons 
        ids="acta" 
        idMateriaD={data.idMateriaD} 
        idPeriodo={data.idPeriodo} 
        idPersonal={data.idPersonal} 
        infoTeacher={data.infoTeacher}
        texto = "Acta de calificaciones" 
        color="secondary" 
        onGenerar={infPdf} />
    )
}