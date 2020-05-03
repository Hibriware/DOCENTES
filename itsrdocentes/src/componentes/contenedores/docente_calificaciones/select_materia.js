import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getTemas, datalista } from '../../servicios/api';
import { dataMateria } from '../../../home'

import { useStyles } from './dialogos_calificacion';

export const SelecMaterias = React.memo((data) => {
    console.log('memo materias')
    const estilos = useStyles();
    const [materia, setMateria] = React.useState('');


    const _buscarTema = async materiaid => {//inicio selec materia en la vista

        let idMateriaActual = materiaid.target.value;
        data.setListas([])//actualiza el la lista de materias actual
        await data.setcalificaciones({ datalistaAlumnos: [] });
        setMateria(idMateriaActual)
        data.setMATERIA_ID(idMateriaActual);//actualizar al estado
        await getTemas(idMateriaActual, data.minimo, data.cierre);

        data.setListas(datalista)//actualiza el la lista de materias actual
    };//fi

    return (
        <div>
            <FormControl variant="outlined" margin="none" size="small" className={estilos.formControl}>
                <InputLabel id="InputLabel">Materia</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined"
                    id="materia"
                    onChange={_buscarTema}
                    label="Materia"
                    value={materia}>
                    {dataMateria.map((materias) => (<MenuItem key={materias.nm} value={materias.idMateria} >{materias.nombre + ' (' + materias.semestre + "/" + materias.nomenclatura + ") " + materias.nombreCorto}</MenuItem>))}
                </Select>
            </FormControl>
        </div>
    );
})