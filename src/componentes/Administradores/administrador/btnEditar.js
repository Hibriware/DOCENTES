import React from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import * as toastr from 'toastr';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1)
    }
}));

function Editar({disabled = true, isDisable, periodos, setIsStatus, handleDisables}) {
    const classes = useStyles();

    const _validar = () => {
        if (periodos) {
            isDisable(false);
            setIsStatus(false)
            handleDisables(false)
        } else {
            toastr.warning("Seleccione un periodo", 'nota');
        }
    };

    return (
        <Button
            disabled={disabled}
            onClick={_validar}
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<EditIcon/>}
        >
            Editar
        </Button>
    );
}

export default Editar;
