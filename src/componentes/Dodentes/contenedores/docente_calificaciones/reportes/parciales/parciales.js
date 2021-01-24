import React from 'react';
import {Buttons} from '../button/button';
import {infPdf} from '../columnasHeader/controller'
//import {MateriasContext} from "../../../../Context/ListaMateriaDocente/ContextMaterias";

export const ReportParciales = (data) => {
    //const {stateMateria,setStateMateria} =useContext(MateriasContext);
    return (
        <div style={{marginRight: '11px'}}>
            <Buttons ids="parcial" texto="Calificaciones Parciales" onGenerar={infPdf} color="primary"/>
        </div>
    );
}
