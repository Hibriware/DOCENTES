import React, {useContext, useEffect} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { datalistaAlumnos, dataCriterios, getAlumnos } from '../../../servicios/api';
import { useStyles } from './dialogos_calificacion';
import {PeriodoMateriasContext} from "../../../../Context/PeriodoMateria/ContextPeriodosMateria";
export var unidadCalificacion, id_criterios;

export const SelectTemas = React.memo((data) => {
    //const [unidad, setUnidad] = React.useState('');
    const [statePeriodoMateria] = useContext(PeriodoMateriasContext);
    const estilos = useStyles();
    useEffect(() => {
        
    data.setUnidad('')
    }, [data.MATERIA_ID])

    const _obtenerTema = async (tem) => {//inico
        data.setOpen(true)
        let numTemas = tem.target.value;
        data.setUnidad(numTemas);
        await getAlumnos(data.MATERIA_ID, numTemas,data.group,data.MateriaDocente,statePeriodoMateria?.data[0].periodo);//LISTA DE ALUMNOS  Pendiene mandar unidad que es el tema #
        await data.setcalificaciones({ datalistaAlumnos: datalistaAlumnos });
        await data.updates(data.MATERIA_ID, numTemas,data.MateriaDocente)
        data.setOpen(false)
        unidadCalificacion = dataCriterios[0].numUnidad
        id_criterios = dataCriterios[0].idcat_Unidad
    }//fin


    return (
            <FormControl variant="outlined" className={estilos.formControl}  margin="none" size="small">
                <InputLabel id="demo-simple-select-outlined-labe">Tema</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-labe"
                    id="Tema"
                    label="Tema"
                    value={data.unidad}
                    onChange={_obtenerTema}>
                    {data.listasTemas.map((tem,i) => (<MenuItem key={i} value={tem.numUnidad}>{tem.tema}</MenuItem>))}
                </Select>
            </FormControl>
    );
})
