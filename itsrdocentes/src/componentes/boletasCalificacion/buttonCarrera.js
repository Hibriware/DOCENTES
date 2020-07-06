import React from 'react';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';
import { main } from './pdf/boletaCarrera';

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1)
	}
}));

function BttonCarrereas({ semestres, periodo, idDcarreras , setLoader}) {
	const classes = useStyles();
    const [activo,setActivo] = React.useState(false)


	async function _imprimir() {
		setActivo(true)
    	setLoader(true)
		if (semestres && periodo && idDcarreras) {
			await main(periodo, idDcarreras, semestres); //PERIODO, ID_CARRERA,SEMESTRE)
    }else{
      alert(" Elija una carrera, periodo y semestre ")
    }
    
    setLoader(false)
	setActivo(false)
	}

	return (
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
	);
}

export default BttonCarrereas;
