import React from 'react';
import { Buttons } from '../button/button';
import {infPdf} from '../columnasHeader/controller'





export const ReportParciales = (data) => {

 

    return (
        <div style={{marginRight:'11px'}}>
            <Buttons ids="parcial" texto="Calificaciones Parciales" onGenerar={infPdf} color="primary" />
        </div>
    );
}