import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { dataMateria } from '../../../home';
import { useStyles } from './dialogos_principal';
import 'jspdf-autotable';
import { ButtonPdf } from './btn_Pdf';


export default function ComposedTextField() {
	const classes = useStyles();
console.log(dataMateria)
console.log('dataMateria <<<')

	return (
		<React.Fragment>
			<CssBaseline />
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
		</React.Fragment>
	);
}
