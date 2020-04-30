import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { datalistaAlumnos, dataCriterios, getAlumnos } from '../../servicios/api';
import { useStyles } from './dialogos_calificacion';
export var unidadCalificacion, id_criterios;

export const SelectTemas = React.memo((data) => {
    console.log('memo sect temas')

    const [unidad, setUnidad] = React.useState('');
    const estilos = useStyles();
    console.log('selctMterias')


    const _obtenerTema = async (tem) => {//inico
        data.setOpen(true)
        let numTemas = tem.target.value;
        setUnidad(numTemas);
        await getAlumnos(data.MATERIA_ID, numTemas);//LISTA DE ALUMNOS  Pendiene mandar unidad que es el tema #
        await data.setcalificaciones({ datalistaAlumnos: datalistaAlumnos });

        await data.updates(data.MATERIA_ID, numTemas)
        data.setOpen(false)

        unidadCalificacion = dataCriterios[0].numUnidad
        id_criterios = dataCriterios[0].idcat_Unidad

    }//fin


    return (
        <div>
            <FormControl variant="outlined" className={estilos.formControl}>
                <InputLabel id="demo-simple-select-outlined-labe">Unidad</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-labe"
                    id="unidad"
                    label="Unidad"
                    value={unidad}
                    onChange={_obtenerTema}>
                    {data.listasTemas.map((tem, i) => (<MenuItem key={i} value={tem.numUnidad}>{tem.tema}</MenuItem>))}
                </Select>
            </FormControl>
        </div>
    );
})