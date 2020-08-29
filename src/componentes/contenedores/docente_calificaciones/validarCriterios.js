import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
			//width: '25ch'
		}
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));

function ValidarCriterios({ setIsBtn, TODOS_LOS_CRITERIOS, setTodo_los_criterios, isBtn, isComfirmar }) {
	const classes = useStyles();

	const CRITERIO_C1 = React.useRef(0);
	const CRITERIO_C2 = React.useRef(0);
	const CRITERIO_C3 = React.useRef(0);
	const CRITERIO_C4 = React.useRef(0);

	const [ LIMITE, setLimite ] = React.useState(100);
	const [ BLOQUEO_PARCIAL, SETBLOQUEO_PARCIAL ] = React.useState({
		BLOQUEO_PARCIAL1: false,
		BLOQUEO_PARCIAL2: false,
		BLOQUEO_PARCIAL3: false,
		BLOQUEO_PARCIAL4: false
	});

	useEffect(
		() => {
			setIsBtn(
				LIMITE === 0
					? CRITERIO_C1.current.value && CRITERIO_C2.current.value && CRITERIO_C3.current.value ? false : true
					: true
			);
		},
		[ LIMITE ]
	);

	useEffect(
		() => {
		
			if (!isBtn) {
				setTodo_los_criterios({
					...TODOS_LOS_CRITERIOS,
					c1: CRITERIO_C1.current.value,
					c2: CRITERIO_C2.current.value,
					c3: CRITERIO_C3.current.value,
					c4: CRITERIO_C4.current.value
				});
			}
		},
		[ isBtn ]
	);

	useEffect(
		() => {
			reset();
		},
		[ isComfirmar ]
	);

	function reset() {
		SETBLOQUEO_PARCIAL({
			BLOQUEO_PARCIAL1: false,
			BLOQUEO_PARCIAL2: false,
			BLOQUEO_PARCIAL3: false,
			BLOQUEO_PARCIAL4: false
		});
		setLimite(100);
		CRITERIO_C1.current.value = '';
		CRITERIO_C2.current.value = '';
		CRITERIO_C3.current.value = '';
		CRITERIO_C4.current.value = '';
	}

	function confiCriterio1() {
		let C1_REFERENCIA = CRITERIO_C1.current.value;
		if (LIMITE > 0 && C1_REFERENCIA.length === 2) {
			if (!BLOQUEO_PARCIAL.BLOQUEO_PARCIAL1) {
				let RESULTADO = Math.max(0, LIMITE - C1_REFERENCIA);
				setLimite(RESULTADO);
				SETBLOQUEO_PARCIAL({
					...BLOQUEO_PARCIAL,
					BLOQUEO_PARCIAL1: true
				});
			}
			CRITERIO_C1.current.value = Math.max(0, Math.min(parseInt(CRITERIO_C1.current.value || 0), LIMITE))
				.toString()
				.slice(0, 2);
		}
	}

	function confiCriterio2() {
		let C2_REFERENCIA = CRITERIO_C2.current.value;

		if (LIMITE > 0 && C2_REFERENCIA.length === 2) {
			if (!BLOQUEO_PARCIAL.BLOQUEO_PARCIAL2) {
				let RESULTADO = Math.max(0, LIMITE - C2_REFERENCIA);

				setLimite(RESULTADO);
				SETBLOQUEO_PARCIAL({
					...BLOQUEO_PARCIAL,
					BLOQUEO_PARCIAL2: true
				});
			}
			CRITERIO_C2.current.value = Math.max(0, Math.min(parseInt(CRITERIO_C2.current.value || 0), LIMITE))
				.toString()
				.slice(0, 2);
		}
	}

	async function confiCriterio3() {
		let C3_REFERENCIA = CRITERIO_C3.current.value;

		if (LIMITE > 0 && C3_REFERENCIA.length === 2) {
			if (!BLOQUEO_PARCIAL.BLOQUEO_PARCIAL3) {
				let RESULTADO = Math.max(0, LIMITE - C3_REFERENCIA);

				setLimite(RESULTADO);
				await SETBLOQUEO_PARCIAL({
					...BLOQUEO_PARCIAL,
					BLOQUEO_PARCIAL3: true
				});
			}
			CRITERIO_C3.current.value = Math.max(0, Math.min(parseInt(CRITERIO_C3.current.value || 0), LIMITE))
				.toString()
				.slice(0, 2);
		}
	}

	function confiCriterio4() {
		let C4_REFERENCIA = CRITERIO_C4.current.value;

		if (LIMITE > 0 && C4_REFERENCIA.length === 2) {
			if (!BLOQUEO_PARCIAL.BLOQUEO_PARCIAL4) {
				let RESULTADO = Math.max(0, LIMITE - C4_REFERENCIA);
				setLimite(RESULTADO);
				SETBLOQUEO_PARCIAL({
					...BLOQUEO_PARCIAL,
					BLOQUEO_PARCIAL4: true
				});
			}
			CRITERIO_C4.current.value = Math.max(0, Math.min(parseInt(CRITERIO_C4.current.value || 0), LIMITE))
				.toString()
				.slice(0, 2);
		}
	}

	return (
		<form className={classes.root}>
			<Grid container justify="center" alignItems="center">
				<Grid item xs={12} sm={6} >
					<Paper elevation={0} className={classes.paper}>
						<TextField
							disabled={BLOQUEO_PARCIAL.BLOQUEO_PARCIAL1}
							inputRef={CRITERIO_C1}
							onChange={confiCriterio1}
							type="number"
							name="c1"
							maxLength="2"
							id="filled-basic1"
							label="C1"
							variant="filled"
							onInput={(e) => {
								e.target.value = CRITERIO_C1.current.value;
							}}
							min={0}
						/>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Paper elevation={0} className={classes.paper}>
						<TextField
							type="number"
							inputRef={CRITERIO_C2}
							disabled={BLOQUEO_PARCIAL.BLOQUEO_PARCIAL2}
							onChange={confiCriterio2}
							name="c2"
							id="filled-basic2"
							label="C2"
							variant="filled"
							onInput={(e) => {
								e.target.value = CRITERIO_C2.current.value;
							}}
							min={0}
						/>
					</Paper>
				</Grid>

				<Grid item xs={12} sm={6}>
					<Paper elevation={0} className={classes.paper}>
						<TextField
							type="number"
							inputRef={CRITERIO_C3}
							disabled={BLOQUEO_PARCIAL.BLOQUEO_PARCIAL3}
							onChange={confiCriterio3}
							name="c3"
							id="filled-basic3"
							label="C3"
							variant="filled"
							onInput={(e) => {
								e.target.value = CRITERIO_C3.current.value;
							}}
							min={0}
						/>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Paper elevation={0} className={classes.paper}>
						<TextField
							type="number"
							inputRef={CRITERIO_C4}
							disabled={BLOQUEO_PARCIAL.BLOQUEO_PARCIAL4}
							onChange={confiCriterio4}
							name="c4"
							id="filled-basic4"
							label="C4"
							variant="filled"
							onInput={(e) => {
								e.target.value = CRITERIO_C4.current.value;
							}}
							min={0}
						/>
					</Paper>
				</Grid>
			</Grid>

			<h5>Porcentaje disponible: {LIMITE}</h5>
			<br />
			<h5>Nota: los criterios c1, c2, c3 son obligatorios, el criterio c4 es opcional.</h5>
			<button type="button" onClick={reset}>
				Volver a empezar
			</button>
		</form>
	);
}

export default React.memo(ValidarCriterios);
