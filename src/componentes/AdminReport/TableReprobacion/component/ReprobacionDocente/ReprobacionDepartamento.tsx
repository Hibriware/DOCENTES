import React from "react";
import {porDepartamentoReprobacion} from './pdf/index';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Periodos from "../../Periodos";
import ListaCarreras from '../../ListaCarreras';
import './style/styles.css';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
        fabProgress: {
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    }),
);

export const DepartamentoReprobacion =()=>{
    const[listaPeriodo,setListaPeriodo] = React.useState(0);
    const [listaCarrera,setListaCarrera]=React.useState(0)

    return(<div className={'depa-container'}>
        <div className={'btn-depa'}>
            <div className={'btn-depa-item'} >
                <Periodos listaPeriodo={listaPeriodo} setListaPeriodo={setListaPeriodo} />

            </div>
            <ListaCarreras listaCarrera={listaCarrera} setListaCarrera={setListaCarrera}/>
        </div>
        <div className={'btn-depa-descarga'}>
            <DescargarsPDF idcarrera={listaCarrera} idperiodo={listaPeriodo} />
        </div>

    </div>)
}

 function DescargarsPDF({idcarrera,idperiodo}:any) {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    const handleButtonClick = async () => {
        if (idperiodo >0 && idcarrera>0){
            alert("Esto puede tomar unos segundos extras.")
            if (!loading) {
                setSuccess(false);
                setLoading(true);
                await porDepartamentoReprobacion(idcarrera,idperiodo)
                setSuccess(true);
                setLoading(false);
            }
        }else{
            sweetAlert('Seleccione un periodo y carrera.')
        }

    };

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Button
                    variant="contained"
                    color="primary"
                    className={buttonClassname}
                    disabled={loading}
                    onClick={handleButtonClick}
                >
                    Descargar PDF
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </div>
    );
}
