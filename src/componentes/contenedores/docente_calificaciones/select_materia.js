import React, {useContext, useEffect} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getTemas, datalista } from '../../servicios/api';
import { dataMateria } from '../../../home'

import { useStyles } from './dialogos_calificacion';
import {MateriasContext} from "../../Context/ListaMateriaDocente/ContextMaterias";
import {PeriodoMateriasContext} from "../../Context/PeriodoMateria/ContextPeriodosMateria";

export const SelecMaterias = React.memo((data) => {
    const {stateMateria,setStateMateria} =useContext(MateriasContext);
    const [statePeriodoMateria] = useContext(PeriodoMateriasContext);

    const estilos = useStyles();
    const [materia, setMateria] = React.useState('');

    const _buscarTema = async materiaid => {//inicio selec materia en la vista
            try {
                let idMateriaActual = materiaid.target.value;
                data.setListas([])//actualiza el la lista de materias actual
                setMateria(idMateriaActual)
                await data.setcalificaciones({ datalistaAlumnos: [] });
                let [{idGrupos,materiaDocenteId,idMateria}] = await stateMateria.filter((res)=>res.materiaDocenteId === idMateriaActual)
                data.setMATERIA_ID(idMateria);//actualizar al estado
                data.setMateriaDocente(materiaDocenteId)
                await getTemas(idMateria, data.minimo, data.cierre,materiaDocenteId,statePeriodoMateria.data[0].periodo);
                data.setGroup(idGrupos)
                data.setListas(datalista)//actualiza el la lista de materias actual
            } catch (error) {
                console.log(error)
            }
       
    };//fi

    return (
<React.Fragment>
    {
        (stateMateria.length) ?
            (<FormControl variant="outlined" margin="none" size="small" className={estilos.formControl}>
                <InputLabel id="InputLabel">Materia</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined"
                    id="materia"
                    onChange={_buscarTema}
                    label="Materia"
                    value={materia}>
                    {stateMateria.map(
                        (materias) =>
                            (<MenuItem
                                key={materias.nm}
                                value={materias.materiaDocenteId}
                            >
                                {materias.nombre + ' (' + materias.semestre + "/" + materias.nomenclatura + ") " + materias.nombreCorto}
                            </MenuItem>)
                    )}
                </Select>
            </FormControl>):(<h4>....</h4>)
    }
</React.Fragment>

      
    );
})
