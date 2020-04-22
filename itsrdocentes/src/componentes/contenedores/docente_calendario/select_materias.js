import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { useStyles } from './dialogos';
import { dataMateria } from '../../../home';


export const SelectMaterias = (data) => {
    const classes = useStyles();

    const _list_materia = (e) => {
        console.log(e)
        console.log('_list_materia')
        e.preventDefault()
        data.mos_Materias(e)
    }


    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="InputLabel">Materia</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined"
                    id="listmateria"
                    onChange={_list_materia}
                    label="Materia"
                    value={data.value}
                    disabled={data.disablesd}>
                    {dataMateria.map((materias) => (<MenuItem key={materias.nm} value={materias} >{materias.nombre + ' (' + materias.semestre + "/" + materias.nomenclatura + ") " + materias.nombreCorto}</MenuItem>))}
                </Select>
            </FormControl>
        </div>
    );
}