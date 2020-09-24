import 'date-fns';
import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import ErrorIcon from '@material-ui/icons/Error';
import moment from 'moment';
import Lista_Periodos from './selectPeriodos';
import Editar from './btnEditar';
import Status from './status';
import {FECHA_ACTUAL} from '../../componentes/servicios/api'
import ActivarTemas from './activaTemas';
import *as toastr from 'toastr';
import { Btn_evaluar } from './funciones';
import { useStyles } from './styles';
import {
	getStatusPeriodo,
	getAdmiFechas,
	dataFechasCierre,
} from '../servicios/api';
import { FechaDate } from './dates';

const Entregas = () => {
	const classes = useStyles();
	const fecha_Defaul = moment(new Date(FECHA_ACTUAL)).format('YYYY-MM-DD, h:mm:ss a');
	const [ entrega1, setEntrega1 ] = React.useState(fecha_Defaul);
	const [ entrega2, setEntrega2 ] = React.useState(fecha_Defaul);
	const [ entrega3, setEntrega3 ] = React.useState(fecha_Defaul);
	const [ entregaFinal, setFinal ] = React.useState(fecha_Defaul);
	const [ periodos, setPeriodos ] = React.useState(false);
	const [ temas, setActivaTemas ] = React.useState({temas:false,disabled:true});
	const [ recargar, setRecargar ] = React.useState(false);
	const [ status, setStatus ] = React.useState(false);
	const [ save, setSave ] = React.useState(false);
	const [ isperiodo, setIsperiodo ] = React.useState(false);
	const [ isStatus, setIsStatus ] = React.useState(false);
	const [ PERIODO, setPeriodo ] = React.useState(false);


	useEffect(
		() => {
			async function actualizar() {
			let RANGO_PERIODO = await getStatusPeriodo();
				setPeriodo(RANGO_PERIODO)
				if(RANGO_PERIODO.periodo){
				await	buscar_cierre_de_acta(RANGO_PERIODO.periodo)
					setActivaTemas({...temas,disabled:true})
				}else{
			
				await buscar_cierre_de_acta(periodos)
				}
			}

			actualizar();
		},
		[ recargar ]
	);

	const handleChange = event => {
        setActivaTemas({...temas, temas:event})
	  }
	  const handleDisables = event => {
        
        setActivaTemas({...temas,disabled:event })
	  }
	  
	const buscar_cierre_de_acta = async (evt) => {
		await getAdmiFechas(evt);
		setPeriodos(evt);
		if (dataFechasCierre.length) {//
			setStatus(true);
			setSave(false);
			setIsStatus(true);
			setEntrega1(moment(dataFechasCierre[0].primera_entrega).format('YYYY-MM-DD, h:mm:ss a'))
			setEntrega2(moment(dataFechasCierre[0].segunda_entrega).format('YYYY-MM-DD, h:mm:ss a'));
			setEntrega3(moment(dataFechasCierre[0].tercera_entrega).format('YYYY-MM-DD, h:mm:ss a'));
			setFinal(moment(dataFechasCierre[0].entrega_final).format('YYYY-MM-DD, h:mm:ss a'));
			setIsperiodo(dataFechasCierre[0].status === 0 ? false : true);//0:false,1:true
			let _temas = dataFechasCierre[0].habilitar_todas === 0 ? false : true
			setActivaTemas({
				...temas, temas:temas.temas=_temas,
				disabled:true
			})

		} else {
			setStatus(false);
			setSave(true);
			setActivaTemas({...temas,disabled:true})
			setIsStatus(true)
			toastr.warning('No se encontraron fechas establecidas', '!')
		}

	};

	return (
		<div>
			  <Chip size="small" icon={<ErrorIcon />} label="El periodo activo será asignado al sistema de alumnos" color="secondary" />
			<h3 style={{ textAlign: 'center' }}>CALENDARIO DE ENTREGA DE CALIFICACIONES</h3>
			<h4 style={{ textAlign: 'center' }}>PERIODO ACTIVO:{PERIODO ? PERIODO.rango + PERIODO.anio: 'NO DISPONIBLE'}</h4>
					<ActivarTemas disabled={temas.disabled} isTemas={temas.temas} handleChange={handleChange} />
			<div className={classes.root}>
				<Card elevation={3}>
					<CssBaseline />
					<Container>
						<Grid container spacing={5}>
							<Grid item xs={12} sm={4}>
								<Paper className={classes.paper} elevation={0}>
									<FechaDate
										entrega={entrega1}
										status={status}
										onGuardar={(date) => setEntrega1(date)}
										info="Primera entrega"
									/>
								</Paper>
							</Grid>
							<Grid item xs={12} sm={4}>
								<Paper className={classes.paper} elevation={0}>
									<FechaDate
										entrega={entrega2}
										status={status}
										onGuardar={(date) => setEntrega2(date)}
										info="Segunda entrega"
									/>
								</Paper>
							</Grid>
							<Grid item xs={12} sm={4}>
								<Paper className={classes.paper} elevation={0}>
									<FechaDate
										entrega={entrega3}
										status={status}
										onGuardar={(date) => setEntrega3(date)}
										info="Tercera entrega"
									/>
								</Paper>
							</Grid>
							<Grid item xs={12}>
								<Paper className={classes.paper} elevation={0}>
									<FechaDate
										entrega={entregaFinal}
										status={status}
										onGuardar={(date) => setFinal(date)}
										info="Entrega Final"
									/>
								</Paper>
							</Grid>
							<Grid item xs={4}>
								<Paper className={classes.paper} elevation={0}>
									<Btn_evaluar
										setRecargar={setRecargar}
										recargar={recargar}
										primera={entrega1}
										segunda={entrega2}
										tercera={entrega3}
										final={entregaFinal}
										periodo={periodos}
										status={isperiodo ? '1' : '0'}
										temas={temas.temas ? '1':'0'}
										isDisable={save}
										isdisabled={status}
									/>
								</Paper>
							</Grid>
							<Grid item xs={4}>
								<Paper className={classes.paper} elevation={0}>
									<Lista_Periodos onBuscar={buscar_cierre_de_acta} />
									
								</Paper>
							</Grid>
							<Grid item xs={4}>
								<Paper className={classes.paper} elevation={0}>
									<Editar disabled={!status} isDisable={setStatus} periodos={periodos} setIsStatus={setIsStatus} handleDisables={handleDisables}/>
									<Status isPeriodo={setIsperiodo} isperiodo={isperiodo} isdisabled={isStatus} />
								</Paper>
							</Grid>
						</Grid>
					</Container>
				</Card>
			</div>
		</div>
	);
};
export default Entregas;
