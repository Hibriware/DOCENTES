import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { crearRegistrosfechas, EXISTNCIA_ACTA, getPeriodo } from '../servicios/api';
import { useStyles } from './styles'


export const Btn_evaluar = (fechas) => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);

    const enviar = async () => {
        if (!EXISTNCIA_ACTA) {
            if (fechas.segunda > fechas.primera && fechas.tercera > fechas.segunda && fechas.final > fechas.tercera) {
                setLoading(true)
                await crearRegistrosfechas(fechas);
                await getPeriodo()
                setLoading(false)
            } else {
                alert("Ejemplo: la segunda entrega debe ser mayor a la primera entrega ")
            }
        } else {
            alert("Hasta el siguente periodo")
        }
    }

    return (
        <div>
            <p>{loading}</p>
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Button variant="outlined" color="primary" onClick={enviar} > Guardar</Button>
        </div>
    );
}

export default { Btn_evaluar }
