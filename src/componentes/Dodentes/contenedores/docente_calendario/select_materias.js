import React, {useContext} from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {useStyles} from './dialogos';
import {MateriasContext} from "../../../../Context/ListaMateriaDocente/ContextMaterias";


export const SelectMaterias = React.memo((data) => {
    const {stateMateria, setStateMateria} = useContext(MateriasContext);
    const classes = useStyles();
    const _list_materia = (e) => {
        e.preventDefault()
        data.mos_Materias(e)
    }


    return (
        <React.Fragment>
            {
                stateMateria.length ?
                    <FormControl fullWidth variant="outlined" margin="none" size="small"
                                 className={classes.formControl}>
                        <InputLabel id="InputLabel">Materia</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined"
                            id="listmateria"
                            onChange={_list_materia}
                            label="Materia"
                            value={data.value}
                            disabled={data.disabled}>
                            {stateMateria.map((materias) => (<MenuItem key={materias.nm}
                                                                       value={materias}>{materias.nombre + ' (' + materias.semestre + "/" + materias.nomenclatura + ") " + materias.nombreCorto}</MenuItem>))}
                        </Select>
                    </FormControl> : <h3>...</h3>}
        </React.Fragment>

    );
});
