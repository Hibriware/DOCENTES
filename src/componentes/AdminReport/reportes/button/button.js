import React from 'react';
import Button from '@material-ui/core/Button';
import {Backdrop,CircularProgress,makeStyles} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

export const Buttons = ({ texto = "btn", color = "secondary", onGenerar, ids="enviando id" , idMateriaD ,idPeriodo, idPersonal,infoTeacher }) => {
    const classes = useStyles();
    const [activo, setActio] = React.useState(false)

    const ejecu = async (e) => {
        e.preventDefault()
        setActio(true)
        await onGenerar(ids,idMateriaD ,idPeriodo, idPersonal,infoTeacher)
        setActio(false)

    }

    return (
        <React.Fragment>
            <Backdrop 
            className={classes.backdrop} 
            open={activo} >
        <CircularProgress color="secondary" />
       <h5>Generando pdf...</h5> 
      </Backdrop>
        <Button 
        size="small" 
        disabled={activo} 
        variant="contained"
         onClick={ejecu}
         color={color}>
        {texto}
        </Button>
        </React.Fragment>
    )
}