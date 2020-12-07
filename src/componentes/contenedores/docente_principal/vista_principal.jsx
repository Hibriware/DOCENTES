import React, {useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {dataPeriodo} from '../../servicios/api';
import { dataMateria } from '../../../home';
import { useStyles } from './dialogos_principal';
import 'jspdf-autotable';
import { ButtonPdf } from './btn_Pdf';
import {MateriasContext} from '../../Context/ListaMateriaDocente/ContextMaterias';
import {PeriodoMateriasContext} from '../../Context/PeriodoMateria/ContextPeriodosMateria';


 function ComposedTextField() {
 	const {stateMateria} = useContext(MateriasContext);
 	const [statePeriodoMateria] = useContext(PeriodoMateriasContext);
	const classes = useStyles();
	return (
		<div>
			<CssBaseline />
			<h3 style={{display:'flex', justifyContent:'center'}}>INSTITUTO TECNOLÓGICO SUPERIOR DE LOS RÍOS</h3>
			<h3 style={{display:'flex', justifyContent:'center'}}>PERIODO:{`${statePeriodoMateria?.data ? statePeriodoMateria?.data[0]?.rango:''} ${statePeriodoMateria?.data ?statePeriodoMateria.data[0].anio:''}` }</h3>

			<Container maxWidth="sm">
				<div className={classes.avatar}>
					<Avatar src="/broken-image.jpg" />
				</div>
				<Typography variant="button" display="block" gutterBottom>
					<strong>Nombre:</strong> {stateMateria.length ? stateMateria[0]?.nameDocente:''}
				</Typography>
				<Typography variant="button" display="block" gutterBottom>
					<strong>Clave:</strong> {stateMateria.length ? stateMateria[0]?.clavePersonal:"No disponible"}
				</Typography>
				<Typography variant="button" display="block" gutterBottom>
					<strong>División:</strong> {stateMateria.length ? stateMateria[0]?.nombreCorto:"No disponible"}
				</Typography>
				<div className={classes.pdfss}>
					<ButtonPdf />
				</div>
			</Container>
		</div>
	);
}


export default React.memo(ComposedTextField)
