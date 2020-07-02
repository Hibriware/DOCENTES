import React from 'react';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

function _imprimir() {

}

function BttonCarrereas() {
    const classes = useStyles();

    return(
        <Button
        disabled
        size="small"
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

export default BttonCarrereas;