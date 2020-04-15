import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { crearRegistrosfechas, EXISTNCIA_ACTA ,getPeriodo} from '../servicios/api';
import { useStyles} from './styles'


export const Btn_evaluar = (fechas) => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);

    const enviar = async () => {
if(!EXISTNCIA_ACTA){
    if (fechas.segunda > fechas.primera && fechas.tercera > fechas.segunda && fechas.final > fechas.tercera) {
        setLoading(true)
       await crearRegistrosfechas(fechas);
       await getPeriodo()
       setLoading(false)


    } else {
        alert("ejemplo: la segunda entrega debe ser mayor a la primera entrega ")
    }
    console.log(moment(new Date()).format('YYYY-MM-DD, h:mm:ss a'))

    console.log(moment(fechas.primera).format('DD/MM/YYYY') + ' primera')
    console.log(moment(fechas.segunda).format('DD/MM/YYYY') + ' segunda')
    console.log(moment(fechas.tercera).format('DD/MM/YYYY') + ' tercera')
    console.log(moment(fechas.final).format('DD/MM/YYYY') + ' final')
    //crearRegistrosfechas()//api moment().format('MMMM Do YYYY, h:mm:ss a');
}else{
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
