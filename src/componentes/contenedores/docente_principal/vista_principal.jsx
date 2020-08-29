import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {dataPeriodo} from '../../servicios/api';
import { dataMateria } from '../../../home';
import { useStyles } from './dialogos_principal';
import 'jspdf-autotable';
import { ButtonPdf } from './btn_Pdf';


 function ComposedTextField() {
	const classes = useStyles();
	return (
		<div>
			<CssBaseline />
			<h3 style={{display:'flex', justifyContent:'center'}}>INSTITUTO TECNOLÓGICO SUPERIOR DE LOS RÍOS</h3>
			<h3 style={{display:'flex', justifyContent:'center'}}>PERIODO:{dataPeriodo[0].rango+dataPeriodo[0].anio}</h3>

			<Container maxWidth="sm">
				<div className={classes.avatar}>
					<Avatar src="/broken-image.jpg" />
				</div>
				<Typography variant="button" display="block" gutterBottom>
					<strong>Nombre:</strong> {(dataMateria[0].nameDocente) || "No disponible"}
				</Typography>
				<Typography variant="button" display="block" gutterBottom>
					<strong>Clave:</strong> {(dataMateria[0].clavePersonal) || "No disponible"}
				</Typography>
				<Typography variant="button" display="block" gutterBottom>
					<strong>División:</strong> {(dataMateria[0].nombreCorto) || "No disponible"}
				</Typography>
				<div className={classes.pdfss}>
					<ButtonPdf />
				</div>
			</Container>
		</div>
	);
}


export default React.memo(ComposedTextField)