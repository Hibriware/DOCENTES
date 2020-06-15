import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1)
	}
}));

function Editar({disabled=true,isDisable}) {
    const classes = useStyles();
    
    const _validar =()=>{
        console.log('habiliatar dates')
        isDisable(false)
    }

	return (
		<Button disabled={disabled} onClick={_validar} variant="contained" color="primary" size="small" className={classes.button} startIcon={<SaveIcon />}>
			Editar
		</Button>
	);
}

export default Editar;
