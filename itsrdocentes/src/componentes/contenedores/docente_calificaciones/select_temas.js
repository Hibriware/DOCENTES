import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { useStyles } from './dialogos_calificacion';


export const SelectTemas = (data) => {
    const estilos = useStyles();

    const _obtenerTema = (e) => {
        e.preventDefault();
        data.lisTemas(e)
    }

    return (
        <div>
            <FormControl variant="outlined" className={estilos.formControl}>
                <InputLabel id="demo-simple-select-outlined-labe">Unidad</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-labe"
                    id="unidad"
                    label="Unidad"
                    value={data.unidad}
                    onChange={_obtenerTema}>
                    {data.listasTemas.map((tem, i) => (<MenuItem key={i} value={tem.numUnidad}>{tem.tema}</MenuItem>))}
                </Select>
            </FormControl>
        </div>
    );
}