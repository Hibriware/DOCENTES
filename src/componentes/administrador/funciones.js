import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import {
	crearRegistrosfechas,
	updateRegistrosfechas,
	restablecerStatus,
	dataFechasCierre,
} from '../servicios/api';
import { useStyles } from './styles';

export const Btn_evaluar = (fechas) => {
	const classes = useStyles();
	const [ loading, setLoading ] = React.useState(false);

	const enviar = async () => {
		if (fechas.periodo) {
		if (
			moment(fechas.segunda).format('YYYY-MM-DD') > moment(fechas.primera).format('YYYY-MM-DD') &&
			moment(fechas.tercera).format('YYYY-MM-DD') > moment(fechas.segunda).format('YYYY-MM-DD') &&
			moment(fechas.final).format('YYYY-MM-DD') > moment(fechas.tercera).format('YYYY-MM-DD')
		) {
			setLoading(true);
			if (fechas.isDisable) {
				await crearRegistrosfechas(fechas);

			} else {
				let STATUS_ACTUAL = dataFechasCierre[0].status;
				if (fechas.status != STATUS_ACTUAL) {
					await restablecerStatus();
				}
				//	ACTUALIZACION DE FECHAS	console.log('actualizando fechas NORMAL');

				await updateRegistrosfechas(fechas);
			}
			//await getPeriodo();
			fechas.setRecargar(!fechas.recargar);
			setLoading(false);
		} else {
			swal('Verifique la cronología de fechas, la segunda entrega no puede ser antes que la primera', {
				button: false
			});
		}
		} else {
            swal("Eliga un periodo", {
                button: false,
              });
            
        }
	};

	return (
		<React.Fragment>
			<p>{loading}</p>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Button disabled={fechas.isdisabled} variant="outlined" color="primary" onClick={enviar}>
				{' '}
				Guardar
			</Button>
		</React.Fragment>
	);
};

export default { Btn_evaluar };
