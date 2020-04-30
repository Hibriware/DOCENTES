import React from 'react';
import {Buttons} from '../button/button';
import {infPdf} from '../columnasHeader/controller';

export const ActaFinal = () =>{


    return(
        <Buttons ids="acta" texto = "Acta de calificaciones" color="secondary" onGenerar={infPdf} />
    )
}