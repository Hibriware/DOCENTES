import React from 'react';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';
import {main} from './pdf/boleta';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));



function ButtonAlumno({idPeriodo, idControl, setLoader}) {
    const classes = useStyles();
    const [activo,setActivo] = React.useState(false)

    async function _imprimir() {
      setActivo(true)
        if(idPeriodo && idControl){
          setLoader(true)
         await main(idPeriodo,idControl)
          setLoader(false)

        }else{
            alert(" Ingrese un numero de control, periodo y semestre ")
        }
      setActivo(false)

    }

    return(
        <Button
        size="small"
        disabled={activo}
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<GetAppIcon />}
        onClick={_imprimir}
      >
    Descargar
      </Button>
    )
}

export default ButtonAlumno;
